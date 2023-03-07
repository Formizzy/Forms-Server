import Joi from 'joi';
// import { JoiAuthBearer } from '../../helpers/validator';

export default {
  credential: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  auth: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(true),
  signup: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};
