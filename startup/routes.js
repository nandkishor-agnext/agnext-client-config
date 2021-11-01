const authlogin = require('../routes/login');
const users = require('../routes/users');
const commoditycategory = require('../routes/commodity-category');
const commodity = require('../routes/commodity');
const variety = require("../routes/variety");
const commodityRejectionReason=require('../routes/commodity-rejection-reason');


module.exports =function(app){

app.use('/auth/login',authlogin);
app.use('/api/users',users);
app.use('/api/commoditycategory',commoditycategory);
app.use('/api/commodities',commodity);
app.use('/api/vareities',variety);
app.use('/api/commodityrejectionreason',commodityRejectionReason);
};