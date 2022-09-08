const Joi = require('joi')

const validationFailed = require('../../responses/validationFailed')

const UpdateRoleSchema = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    status: Joi.string(),
    permissions: Joi.array().required()
});

async function updateRoleRequest(req, res, next) {
    const validate = UpdateRoleSchema.validate(req.body);
    if(validate.error){
        res.status(400).send(validationFailed(validate.error.details[0].message, validate.error.details));
    }else{
        next();
    }
}

module.exports = updateRoleRequest;