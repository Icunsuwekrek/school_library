/**load joi library */
const Joi = require(`joi`).extend(require(`@joi/date`))

/**create functiton to validate request of member */
const validateBorrow = (request, response, next) => {
    /**define rules for request */
    const rules = Joi
        .object()
        .keys({
            memberID:Joi.number().required(),
            adminID:Joi.number().required(),
            date_of_borrow:Joi.date().format(['YYYY-MM-DD','DD-MM-YYYY']),
            date_of_return:Joi.required(),
            status:Joi.required(),
            details_of_borrow:Joi.required()
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

module.exports = { validateBorrow }