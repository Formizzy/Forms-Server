import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
}

export default (
    schema: Joi.AnySchema,
    source: ValidationSource = ValidationSource.BODY,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source]);

      if (!error) return next();
      next(error)
    } catch (error) {
      console.log(error)
      next(error);
    }
  };
