import express from 'express';
import signup from './accessFunctionalities/signup';
import login from './accessFunctionalities/login';
import logout from './accessFunctionalities/logout';
import secure from './accessFunctionalities/secure';
import createForm from './forms/createForm';
import googleSignIn from './accessFunctionalities/signinWithGoogle';
import githubSignIn from './accessFunctionalities/signinWithGithub';
import submitForm from './forms/submitForm';

const router = express.Router();

router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);
router.use('/secure', secure);
router.use('/createForm', createForm);
router.use('/signin-with-google', googleSignIn);
router.use('/signin-with-github', githubSignIn);
router.use('/submit-form', submitForm)

export default router;