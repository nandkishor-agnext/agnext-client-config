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
  
  try{
      
      const customer = new QualixCustomer({
          name:req.body.name,
          email:req.body.email,
        //  password:req.body.password,
          contact_number:req.body.contact_number,
          gst:req.body.gst,
          pan:req.body.pan,
          commodity_category_ids:req.body.commodity_category_ids,
          address: {address1:req.body.address1,country:req.body.country,state:req.body.state,city:req.body.city,pincode:req.body.pincode},
          user:{
            first_name:req.body.user.first_name,
            last_name:req.body.user.last_name,
            email:req.body.user.email,
            contact_number:req.body.user.contact_number,
            roles:req.body.user.roles,
            user_hierarchy:req.body.user.user_hierarchy,
            is_2fa_required:req.body.user.is_2fa_required,
            address:{
              address1:req.body.user.address.address1,
              country:req.body.user.address.country,
              state:req.user.address.body.state,
              city:req.body.user.address.city,
              pincode:req.user.address.pincode},
          },
          isactive:true,
          isActive:true
      });

     const newCustomer = await customer.save();
     req.responseObject = newCustomer;
      req.responseStatus = status.SUCCESS;
      req.responseStatusCode = 201;
      next();
  }
  catch(err){
      res.status(500).json({
          status: status.ERROR,
          message:err.message
        });
  }
  // let customertopost = getTempCustomer();
  //  await agclientCreate
  //   .createClient("61dd449b8f6f394a31ec6ed4", customertopost)
  //   .then((res) => { //Getting success response here store it to database
  //     console.log({ successsucessOne: res.data.customer_id });
  //     console.log({ successsucessOne: res.data.customer_uuid});
  //   })
  //   .catch((errorres) => {
  //     //console.log({ errorreserrorreserrorres: errorres });
  //     if (errorres.statuscode && errorres.statuscode == 401) {
  //       //Token Expire call it max five time
  //       agclientCreate
  //         .createClient("61dd449b8f6f394a31ec6ed4", customertopost, true)
  //         .then((dupres) => {
  //           console.log({ successsucesstow: res });
  //         })
  //         .catch((duperr) => {
  //           res.status(500).json({
  //             status: status.ERROR,
  //             message: duperr.error,
  //           });
  //         });
  //     } else {
  //       res.status(500).json({
  //         status: status.ERROR,
  //         message: errorres.error,
  //       });
  //     }
  //   });

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

module.exports = routes;
