const authlogin = require('../routes/login');
const users = require('../routes/users');
const commoditycategory = require('../routes/commodity-category');
const commodity = require('../routes/commodity');
const variety = require("../routes/variety");
const RejectionReason=require('../routes/rejection-reason');
const analytic = require("../routes/analytic")


module.exports =function(app){

app.use('/auth/login',authlogin);
app.use('/api/users',users);
app.use('/api/commoditycategory',commoditycategory);
app.use('/api/commodities',commodity);
app.use('/api/vareities',variety);
app.use('/api/rejectionreason',RejectionReason);
app.use('/api/analytic',analytic);
};