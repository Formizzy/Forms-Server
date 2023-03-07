import { model, Schema, Types } from 'mongoose';

export const DOCUMENT_NAME = 'forms';
export const COLLECTION_NAME = 'forms';

export default interface Form {
  _id: Types.ObjectId;
  formName: string;
  totalSubmissions: Number;
  endpoint: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Form>(
  {
    formName: {
        type: Schema.Types.String,
    },
    totalSubmissions: {
        type: Schema.Types.Number
    },
    endpoint: {
        type: Schema.Types.String
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

export const FormModel = model<Form>(DOCUMENT_NAME, schema, COLLECTION_NAME);
