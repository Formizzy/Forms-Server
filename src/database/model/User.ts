import { model, Schema, Types } from 'mongoose';
import Form from './Form';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User {
  _id: Types.ObjectId;
  email?: string;
  password?: string;
  formIds: Form[];
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<User>(
  {
    email: {
      type: Schema.Types.String,
      maxlength: 200,
    },
    password: {
      type: Schema.Types.String,
      select: "",
    },
    formIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Forms',
        },
      ],
      select: false,
    },
    firstName: {
      type: Schema.Types.String,
      default: "",
    },
    lastName: {
      type: Schema.Types.String,
      default: "",
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
);

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
