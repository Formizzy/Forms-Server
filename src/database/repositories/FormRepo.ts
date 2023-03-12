import { getDBModel } from '../helpers/getModel';
import { switchDatabases } from '../helpers/switcher';
import Form from '../model/Form';
import { userDbSchemas } from '../model/MultiDatabase';

export const createForm = async function (form: Form, userDBName : string): Promise<{ form: Form }> {

  let userDBConnection = await switchDatabases(userDBName, userDbSchemas);

  const formModel = await getDBModel(userDBConnection,'form');
  
  form.createdAt = form.updatedAt = new Date();

  const createdForm = await formModel?.create(form);

  return {
    form: { ...createdForm.toObject() }
  };
}

export default {
  createForm,
};
