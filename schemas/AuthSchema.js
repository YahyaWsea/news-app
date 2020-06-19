const Joi = require('@hapi/joi');

const LoginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),

    password: Joi.string()
        .min(8)
        .required(),
})

const RegisterSchema = Joi.object({
    fullname: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2 }),

    password: Joi.string()
        .min(8)
        .required(),

    confirm_password: Joi.ref('password'),
})


module.exports = { LoginSchema, RegisterSchema }
