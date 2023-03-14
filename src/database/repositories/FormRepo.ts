import { clearConfigCache } from 'prettier';
import { getDBModel } from '../helpers/getModel';
import { switchDatabases } from '../helpers/switcher';
import Form from '../model/Form';
import { userDbSchemas } from '../model/MultiDatabase';

export const createForm = async function (form: Form, userDBName : string): Promise<{ form: Form }> {

  let userDBConnection = await switchDatabases(userDBName, userDbSchemas);

  const userId = userDBName;

  const formModel = await getDBModel(userDBConnection,'form');
  
  form.createdAt = form.updatedAt = new Date();

  const createdForm = await formModel?.create(form);

  const result = await formModel?.findByIdAndUpdate(
      { _id : createdForm._id },
      { $set : { endpoint : (userId + "-" + createdForm._id).toString() }},
      { new : true }
    ).lean();

  return {
    form: result
  };
}

export default {
  createForm,
};
