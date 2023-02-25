import userSchema from './user.js';
import formSchema from './form.js';

export const masterDbSchemas = new Map([['user', userSchema]])
export const userDbSchemas = new Map([['form', formSchema]])