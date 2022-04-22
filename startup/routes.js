const authlogin = require('../routes/login');
const logout = require('../routes/logout');
const users = require('../routes/users');
const customer = require('../routes/customer');
const customercommodities = require('../routes/customercommodities');
const commoditycategory = require('../routes/commodity-category');
const commodity = require('../routes/commodity');
const variety = require("../routes/variety");
const rejectionReason=require('../routes/rejection-reason');
const analytic = require("../routes/analytic")
const agnextClients = require("../routes/agclient");
const cities = require("../routes/city");
const states = require('../routes/states');
const responseSender = require('../middleware/responsender');

const auth = require('../middleware/auth');


module.exports =function(app){

app.use('/auth/login',authlogin);
app.use('/auth/logout',logout,auth);
app.use('/api/users',auth,users);
app.use('/api/commoditycategory',auth,commoditycategory,responseSender);
app.use('/api/commodities',auth,commodity,responseSender);
app.use('/api/vareities',auth,variety,responseSender);
app.use('/api/rejectionreason',auth,rejectionReason,responseSender);
app.use('/api/analytic',auth,analytic,responseSender);
app.use('/api/customer',auth,customer,responseSender);
app.use('/api/agclient',auth,agnextClients,responseSender);
app.use('/api/city',auth,cities,responseSender);
app.use('/api/state',auth,states,responseSender);
app.use('/api/customercommodities',auth,customercommodities,responseSender);
};