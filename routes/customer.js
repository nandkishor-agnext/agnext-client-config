const express = require("express");
const status = require("../constants/responseStatus");
const { QualixCustomer } = require("../models/qualixCustomer");
const agclienthelper = require("../agclients/agclienthelper");
const agclientCreate = require("../clientwebcalls/clientcreatecall");

const routes = express.Router();

routes.get("/", async (req, res, next) => {
  try {
    const customers = await QualixCustomer.find();
    req.responseObject = customers;
    req.responseObjectCount = customers.length;
    req.responseStatus = status.SUCCESS;
    req.responseStatusCode = 200;
    next();
  } catch (err) {
    res.status(500).json({
      status: status.ERROR,
      message: err.message,
    });
  }
});

routes.get("/:id", async (req, res, next) => {
  try {
    const customer = await QualixCustomer.findById(req.params.id);
    if (!customer) return res.status(401).send("Customer Not Found");
    req.responseObject = customer;
    req.responseStatus = status.SUCCESS;
    req.responseStatusCode = 200;
    next();
  } catch (err) {
    res.status(500).json({
      status: status.ERROR,
      message: err.message,
    });
  }
});

routes.post("/", async (req, res, next) => {
  //let customer=null;
  try{
    
    const existingCustomer =  await QualixCustomer.findOne({ $or: [ { email: req.body.email }, { contact_number: req.body.contact_number } ] });    
    if(existingCustomer) return res.status(400).send('Customer Email or Contact Number already exists.');

      let customer = new QualixCustomer({
        name:req.body.name,
        email:req.body.email,      
        contact_number:req.body.contact_number,
        gst:req.body.gst,
        pan:req.body.pan,
        commodity_category_ids:req.body.commodity_category_ids,
        address: getAddress(req.body.address),
        user:{
          first_name:req.body.user.first_name,
          last_name:req.body.user.last_name,
          email:req.body.user.email,
          contact_number:req.body.user.contact_number,
          roles:req.body.user.roles,
          user_hierarchy:req.body.user.user_hierarchy,
          is_2fa_required:req.body.user.is_2fa_required,
          address:getAddress(req.body.user.address),
        },
        agClient_id: req.body.agClient_id,
        isactive:true,
        isActive:true
      });     
      
      let customertopost = customerMapping(customer);  
     // console.log('calling here one');
      await createCustomersOnOtherPlatform(req.body.agClient_id,customertopost)
      .then(async res =>{
        console.log({'customerOnClientPlatform':res});
                 
        customer.enviornment_customer_id = res.customer_uuid;
        const newCustomer = await customer.save();
        req.responseObject = {data:newCustomer,seasons:defaultSeasons(),dtrVariables:defaultDTRs()};
        req.responseStatus = status.SUCCESS;
        req.responseStatusCode = 201;
        next();
      })     
      .catch(error => {        
        res.status(400).json({
          status: status.ERROR,
          message:error
        });
      });      
      
     // next();
  }
  catch(err){
    
    res.status(500).json({
      status: status.ERROR,
      message:err.message
    });
  }
  

  });

routes.put("/:id", async (req, res, next) => {
  try {
    let customer = await QualixCustomer.findById(req.params.id);
    if (!customer) return res.status(401).send("Customer Not Found");

    customer.name = req.body.name;
    customer.email = req.body.email;
    customer.mobile = req.body.mobile;
    customer.gst = req.body.gst;
    customer.pan = req.body.pan;
    customer.cin = req.body.cin;
    customer.commodity_category_ids = req.body.commodity_category_ids
    // customer.address= tempaddress;

    customer = await customer.save();
    req.responseObject = customer;
    req.responseStatus = status.SUCCESS;
    req.responseStatusCode = 200;
    next();
  } catch (err) {
    res.status(500).json({
      status: status.ERROR,
      message: err.message,
    });
  }
});

routes.delete("/:id", async (req, res, next) => {
  try {
    const customer = await QualixCustomer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(401).send("Customer Not Found");
    req.responseStatus = status.SUCCESS;
    req.responseStatusCode = 204;
    next();
  } catch (err) {
    res.status(500).json({
      status: status.ERROR,
      message: err.message,
    });
  }
});

async function createCustomersOnOtherPlatform(agClient_id,customertopost){
  let clientData=null;
  await agclientCreate
  .createClient(agClient_id, customertopost)
  .then((res) => { 
    //console.log({'resresresrreone':res});    
    console.log({'resresresrreonedatatatatatat':res.data});    
    clientData = res.data;
  })
  .catch(async (errorres) => {
    //console.log({'errorreserrorreserrorreserrorreserrorres9999999':errorres});
    if (errorres.statuscode && errorres.statuscode == 401) {
      
       await agclientCreate
        .createClient(agClient_id, customertopost, true)
        .then((dupres) => {    
          console.log({'dupresdupresdupresdupresdupres':dupres});          
          clientData = dupres.data;
         })
      .catch((duperror) => {
       
      
      throw duperror
        
      });
    }
     else {
      
     
      throw errorres; 
      
    }
  });

  return clientData;
}

function customerMapping(newCustomer){
// console.log({'customerMapping':newCustomer});
// console.log({'customerMapping.address':newCustomer.address});
// console.log({'newCustomer.user.address':newCustomer.user.address});
  let customertopost = {
    name: newCustomer.name,
    email: newCustomer.email,
    contact_number: newCustomer.contact_number,
    gst: newCustomer.gst,
    pan: newCustomer.pan,
    partner_id: "",
    is_partner: false,
    commodity_category_ids: [],
    address : [
      {
        address1: newCustomer.address.length ? newCustomer.address[0].address1:'',
        country: newCustomer.address.length ? newCustomer.address[0].country:'', 
        state: newCustomer.address.length ? newCustomer.address[0].state:'',
        city: newCustomer.address.length ? newCustomer.address[0].city:'',
        pincode: newCustomer.address.length ? newCustomer.address[0].pincode:'',
      }
    ],
    bank_details: [
      { bank_name: "", branch: "", bank_account_number: "", ifsc: "" },
    ],
    user: {
      first_name: newCustomer.user.first_name,
      last_name: newCustomer.user.last_name,
      email: newCustomer.user.email,
      contact_number: newCustomer.user.contact_number,
      roles: ["admin"],
      user_hierarchy: "admin",
      is_2fa_required: 1,
      address: [
        {
          address1: newCustomer.user.address.length ? newCustomer.user.address[0].address1:'',
          country: newCustomer.user.address.length ? newCustomer.user.address[0].country:'',
          state: newCustomer.user.address.length ? newCustomer.user.address[0].state:'',
          city: newCustomer.user.address.length ? newCustomer.user.address[0].city:'',
          pincode: newCustomer.user.address.length ? newCustomer.user.address[0].pincode:'',
        },
      ],
    },
  };

  return customertopost;
}

function getTempCustomer() {
  let customertopost = {
    name: "nk dev",
    email: "nkdev6@agnext.in",
    contact_number: "7898789878",
    gst: "26HABCU9623R1ZX",
    pan: "GMXPN6832B",
    partner_id: "",
    is_partner: false,
    commodity_category_ids: [3, 6],
    address: [
      {
        address1: "MY TEST ADDRESS",
        country: "101",
        state: "2",
        city: "5",
        pincode: "160606",
      },
    ],
    bank_details: [
      { bank_name: "", branch: "", bank_account_number: "", ifsc: "" },
    ],
    user: {
      first_name: "nk dev",
      last_name: "test",
      email: "nkdevuser6@agnext.in",
      contact_number: "6787876787",
      roles: ["admin"],
      user_hierarchy: "admin",
      is_2fa_required: 1,
      address: [
        {
          address1: "MY TEST ADDRESS",
          country: "101",
          state: "17",
          city: "1524",
          pincode: "160606",
        },
      ],
    },
  };

  return customertopost;
}

 function getAddress(addressbody){
    return {
      address1:addressbody.address1,
      country: parseInt(addressbody.country),
      state:parseInt(addressbody.state),
      city:parseInt(addressbody.city),
      pincode:parseInt(addressbody.pincode)
    }
 }

 function defaultSeasons(){
  return [
    {
      "seasonName": "Rabi2020",
      "seasonStartDate": "2020-03-01",
      "seasonEndDate": "2020-08-31"
    },
    {
      "seasonName": "Kharif2020",
      "seasonStartDate": "2020-09-01",
      "seasonEndDate": "2021-02-28"
    },
    {
      "seasonName": "Rabi2021",
      "seasonStartDate": "2021-03-01",
      "seasonEndDate": "2021-08-31"
    },
    {
      "seasonName": "Kharif2021",
      "seasonStartDate": "2021-09-01",
      "seasonEndDate": "2022-02-28"
    },
    {
      "seasonName": "Rabi2022",
      "seasonStartDate": "2022-03-01",
      "seasonEndDate": "2022-08-31"
    },
    {
      "seasonName": "Kharif2022",
      "seasonStartDate": "2022-09-01",
      "seasonEndDate": "2023-02-28"
    },
    {
      "seasonName": "Rabi2023",
      "seasonStartDate": "2023-03-01",
      "seasonEndDate": "2023-08-31"
    },
    {
      "seasonName": "Kharif2023",
      "seasonStartDate": "2023-09-01",
      "seasonEndDate": "2024-02-29"
    },
    {
      "seasonName": "Rabi2024",
      "seasonStartDate": "2024-03-01",
      "seasonEndDate": "2024-08-31"
    },
    {
      "seasonName": "Kharif2024",
      "seasonStartDate": "2024-09-01",
      "seasonEndDate": "2025-02-28"
    },
    {
      "seasonName": "Rabi2025",
      "seasonStartDate": "2025-03-01",
      "seasonEndDate": "2025-08-31"
    },
    {
      "seasonName": "Kharif2025",
      "seasonStartDate": "2025-09-01",
      "seasonEndDate": "2026-02-28"
    }
  ]
 }

 function defaultDTRs(){
 return [
    {
      "field_name": "accepted_bags",
      "default_value": "0",
      "display_on_ui": false,
      "display_on_client": false,
      "units": "",
      "view_type": "editText",
      "data_type": "string",
      "display_name": "Accepted Bags",
      "index": 100,
      "mandatory": false
    },
    {
      "field_name": "farmer_code",
      "default_value": null,
      "display_on_ui": false,
      "display_on_client": false,
      "units": "",
      "view_type": "editText",
      "data_type": "string",
      "display_name": "Farmer Code",
      "index": 100,
      "mandatory": false
    },
    {
      "field_name": "assaying_type",
      "default_value": "INDIVIDUAL",
      "display_on_ui": true,
      "display_on_client": false,
      "units": "",
      "view_type": "editText",
      "data_type": "string",
      "display_name": "Scan Type",
      "index": 100,
      "mandatory": false
    },
    {
      "field_name": "stack_number",
      "default_value": "0",
      "display_on_ui": false,
      "display_on_client": false,
      "units": "",
      "view_type": "editText",
      "data_type": "string",
      "display_name": "Stack Number",
      "index": 100,
      "mandatory": false
    },
    {
      "field_name": "gate_pass",
      "default_value": "0",
      "display_on_ui": false,
      "display_on_client": false,
      "units": "",
      "view_type": "editText",
      "data_type": "string",
      "display_name": "Gate Pass No.",
      "index": 100,
      "mandatory": false
    },
    {
      "field_name": "weighbridge_name",
      "default_value": null,
      "display_on_ui": false,
      "display_on_client": false,
      "units": "",
      "view_type": "editText",
      "data_type": "string",
      "display_name": "Weighbridge Name",
      "index": 100,
      "mandatory": false
    }
  ]
 }

module.exports = routes;
