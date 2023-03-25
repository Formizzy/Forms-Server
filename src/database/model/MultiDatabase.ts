import { userSchema } from './User';
import { formSchema } from './Form';
import { submitFormSchema } from './SubmitForm';

export const masterDbSchemas = new Map([['user', userSchema]])
export const userDbSchemas = new Map([['form', formasdSchema]])
export const formDbSchemas = new Map([['formSubmission', submitFormSchema]])