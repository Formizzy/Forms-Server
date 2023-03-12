import { userSchema } from './User';
import { formSchema } from './Form';

export const masterDbSchemas = new Map([['user', userSchema]])
export const userDbSchemas = new Map([['form', formSchema]])