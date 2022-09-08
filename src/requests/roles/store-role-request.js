const Joi = require('joi')

const validationFailed = require('../../responses/validationFailed')

const StoreRoleSchema = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    status: Joi.string(),
    permissions: Joi.array().required()
});

async function storeRoleRequest(req, res, next) {
    const validate = StoreRoleSchema.validate(req.body);
    if (validate.error) {
        res.status(400).send(validationFailed(validate.error.details[0].message, validate.error.details));
    } else {
        next();
    }
}

module.exports = storeRoleRequest;