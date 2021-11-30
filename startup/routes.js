const authlogin = require('../routes/login');
const users = require('../routes/users');
const commoditycategory = require('../routes/commodity-category');
const commodity = require('../routes/commodity');
const variety = require("../routes/variety");
const rejectionReason=require('../routes/rejection-reason');
const analytic = require("../routes/analytic")
const responseSender = require('../middleware/responsender');


module.exports =function(app){

app.use('/auth/login',authlogin);
app.use('/api/users',users);
app.use('/api/commoditycategory',commoditycategory,responseSender);
app.use('/api/commodities',commodity,responseSender);
app.use('/api/vareities',variety,responseSender);
app.use('/api/rejectionreason',rejectionReason,responseSender);
app.use('/api/analytic',analytic,responseSender);
};