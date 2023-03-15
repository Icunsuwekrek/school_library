/**load joi library */
const Joi = require(`joi`)


/**create functiton to validate request of member */
const validateAdmin = (request, response, next) => {
    /**define rules for request */
    const rules = Joi
        .object()
        .keys({
            /**name is require */
            name: Joi.string().required(),
            /**contact is number only and required */
            contact: Joi.number().required(),
            /**address is required */
            address: Joi.string().required(),
            /**gender is only "male" and "female" allowed */
            username: Joi.string().required(),
            password: Joi.string().required()
        })
        .options({ abortEarly: false })

    /**get error of validation if is exists */
    let { error } = rules.validate(request.body)

    /**if error is exsists */
    if (error != null) {
        /**get all error massage */
        let errMassage = error.details.map(it => it.message).join(",")

        /**return error massage with code 422 */
        return response.status(422).json({
            success: false,
            massage: errMassage
        })
    }

    /**if error doesn't exist, continue to cotroller */
    next()
}

module.exports = { validateAdmin }