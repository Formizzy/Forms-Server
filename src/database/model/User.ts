import { Schema, Types } from 'mongoose';


export default interface User {
  _id: Types.ObjectId;
  email?: string;
  password: string | null;
  firstName: string;
  lastName: string;
  authMethod: "GOOGLE" | "GITHUB" | "EMAIL";
  createdAt?: Date;
  updatedAt?: Date;
}

export const userSchema = new Schema<User>(
  {
    email: {
      type: Schema.Types.String,
      maxlength: 200,
    },
    password: {
      type: Schema.Types.String,
      select: false
    },
    firstName: {
      type: Schema.Types.String,
      default: "",
    },
    lastName: {
      type: Schema.Types.String,
      default: "",
    },
    authMethod: {
      type: Schema.Types.String,
      default: "EMAIL"
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
