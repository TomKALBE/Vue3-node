import Joi from "joi";

export const loginValidator = Joi.object({
    email: Joi.string().email({ tlds: {allow: false} }),
    password: Joi.string().required(),
})
export const registerValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: {allow: false} }),
    password: Joi.string().required(),
})