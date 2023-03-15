/**load joi library */
const Joi = require(`joi`)


/**create functiton to validate request of member */
const validateMember = (request) => {
    /**define rules for request */
    const rules = Joi
        .object()
        .keys({
            /**name is require */
            name: Joi.string().required(),
            /**address is required */
            address: Joi.string().required(),
            /**contact is number only and required */
            contact: Joi.number().required(),
            /**gender is only "male" and "female" allowed */
            gender: Joi.string().valid(`Male`, `Female`)
        })
        .options({ abortEarly: false }) //abort= berhenti early = awal

    /**get error of validation if is exists */
    let { error } = rules.validate(request.body)

    /**if error is exsists */
    if (error != null) {
        /**get all error massage */
        let errMassage = error.details.map(it => it.message).join(",")

     return{
        status:false,
        message:errMassage
     }
    }

    /**if error doesn't exist, continue to cotroller */
    return{
        status:true
    }
}

module.exports =  validateMember 