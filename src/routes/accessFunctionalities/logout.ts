import express, { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../../database/model/User";
import { sign } from "jsonwebtoken";
import validator from "../../helpers/validator";
import schema from "./schema"
import UserRepo from "../../database/repositories/UserRepo";

const router = express.Router();

export default router;