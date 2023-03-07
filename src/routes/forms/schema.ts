import Joi from 'joi';

export default {
  createForm: Joi.object().keys({
    formName: Joi.string().required(),
    totalSubmissions: Joi.number().required(),
    endpoint: Joi.string().required(),
  }),
};
