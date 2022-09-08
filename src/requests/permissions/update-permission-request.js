const Joi = require('joi')

const validationFailed = require('../../responses/validationFailed')

const UpdatePermissionSchema = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    group:Joi.string().required(),
});

async function updatePermissionRequest(req, res, next) {
    const validate = UpdatePermissionSchema.validate(req.body);
    if(validate.error){
        res.status(400).send(validationFailed(validate.error.details[0].message, validate.error.details));
    }else{
        next();
    }
}

module.exports = updatePermissionRequest;