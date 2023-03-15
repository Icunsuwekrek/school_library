/**load joi library */
const Joi = require(`joi`)


/**create functiton to validate request of member */
const validateBook = (request, response, next) => {
    /**define rules for request */
    const rules = Joi
        .object()
        .keys({
            isbn: Joi.number().required(),
            tittle: Joi.string().required(),
            author: Joi.string().required(),
            publisher:Joi.string().required(),
            category:Joi.string().required(),
            stock:Joi.number().min(1).max(3).required()
        
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

module.exports = { validateBook }