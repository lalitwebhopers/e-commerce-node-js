const Joi = require('joi')

const validationFailed = require('../../responses/validationFailed')

const UpdateRoleSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.string(),
    password: Joi.string(),
    status: Joi.string(),
    role_id: Joi.string()
});

async function updateRoleRequest(req, res, next) {
    const validate = UpdateRoleSchema.validate(req.body);
    if (validate.error) {
        res.status(400).send(validationFailed(validate.error.details[0].message, validate.error.details));
    } else {
        next();
    }
}

module.exports = updateRoleRequest;