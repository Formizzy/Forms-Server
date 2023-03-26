import Joi from 'joi';

export default {
  createForm: Joi.object().keys({
    formName: Joi.string().required(),
    totalSubmissions: Joi.number().default(0),
    endpoint: Joi.string().default(""),
  }),
  submitForm: Joi.object().required().allow({}),
}
