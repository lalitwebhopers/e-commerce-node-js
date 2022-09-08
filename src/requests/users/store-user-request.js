const Joi = require('joi')

const validationFailed = require('../../responses/validationFailed')

const StoreUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required(),
    status: Joi.string().required(),
    role: Joi.string().required()
});

async function storeUserRequest(req, res, next) {
    const validate = StoreUserSchema.validate(req.body);
    if (validate.error) {
        res.status(400).send(validationFailed(validate.error.details[0].message, validate.error.details));
    } else {
        next();
    }
}

module.exports = storeUserRequest;