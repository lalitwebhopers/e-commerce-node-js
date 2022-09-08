const Joi = require('joi')

const validationFailed = require('../../responses/validationFailed')

const StorePermissionSchema = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    group:Joi.string().required(),
});

async function storePermissionRequest(req, res, next) {
    const validate = StorePermissionSchema.validate(req.body);
    if(validate.error){
        res.status(400).send(validationFailed(validate.error.details[0].message, validate.error.details));
    }else{
        next();
    }
}

module.exports = storePermissionRequest;