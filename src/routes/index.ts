import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import signup from './accessFunctionalities/signup';
import login from './accessFunctionalities/login';
import logout from './accessFunctionalities/logout';
import secure from './accessFunctionalities/secure';
import createForm from './forms/createForm'

const router = express.Router();

router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);
router.use('/secure', secure)
router.use('/createForm', createForm);

export default router;

