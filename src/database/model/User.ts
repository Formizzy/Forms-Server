import { Schema, Types } from 'mongoose';


export default interface User {
  _id: Types.ObjectId;
  email?: string;
  password: string | null;
  name: string;
  authMethod: "GOOGLE" | "GITHUB" | "EMAIL";
  refreshToken: string;
  profileImage: string;
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
    name: {
      type: Schema.Types.String,
      default: "",
    },
    authMethod: {
      type: Schema.Types.String,
      default: "EMAIL"
    },
    refreshToken: {
      type: Schema.Types.String,
    },
    profileImage: {
      type: Schema.Types.String,
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
