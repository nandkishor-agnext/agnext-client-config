const authlogin = require('../routes/login');
const users = require('../routes/users');
const commoditycategory = require('../routes/commodity-category');
const commodity = require('../routes/commodity');
const variety = require("../routes/variety");
const rejectionReason=require('../routes/rejection-reason');
const analytic = require("../routes/analytic")
const responseSender = require('../middleware/responsender');
const auth = require('../middleware/auth');


module.exports =function(app){

app.use('/auth/login',authlogin);
app.use('/api/users',users,auth);
app.use('/api/commoditycategory',commoditycategory,auth,responseSender);
app.use('/api/commodities',commodity,auth,responseSender);
app.use('/api/vareities',variety,auth,responseSender);
app.use('/api/rejectionreason',rejectionReason,auth,responseSender);
app.use('/api/analytic',analytic,auth,responseSender);
};