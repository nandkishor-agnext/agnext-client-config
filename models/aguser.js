const {addressSchema} = require('./addressSchema');


module.exports = class AGUser {
    constructor(
        first_name='',
        last_name='',
        email='',
        password='',
        contact_number='',
        roles=[],
        user_hierarchy="admin",
        is_2fa_required=1,        
        address=[addressSchema] 
    )
};