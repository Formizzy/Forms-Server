import { Connection } from 'mongoose';
import { getDBModel } from '../helpers/getModel';
import { switchDatabases } from '../helpers/switcher';
import Form from '../model/Form';
import { formDbSchemas, userDbSchemas } from '../model/MultiDatabase';
import SubmittedForm from '../model/SubmitForm';

const createForm = async function (form: Form, userDBName : string): Promise<{ form: Form }> {

  const userDBConnection : Connection = await switchDatabases(userDBName, userDbSchemas);

  const userId = userDBName;

  const formModel = await getDBModel(userDBConnection,'form');
  
  form.createdAt = form.updatedAt = new Date();

  const createdForm = await formModel.create(form);

  const result = await formModel.findByIdAndUpdate(
      { _id : createdForm._id },
      { $set : { endpoint : (userId + "-" + createdForm._id).toString() }},
      { new : true }
    ).lean();

  //switching the connection to make formId document in inside user collection
  await switchDatabases(result._id, formDbSchemas);

  return {
    form: result
  };
}

const submitForm = async function (formData: SubmittedForm, userDBName: string): Promise<{submittedForm : SubmittedForm}> {

  const userDBConnection : Connection = await switchDatabases(userDBName, userDbSchemas);

  const submittedFormModel = await getDBModel(userDBConnection, formData._id.toString());

  formData.createdAt = formData.updatedAt = new Date();

  const submittedForm = await submittedFormModel.create(formData);

  return {
    submittedForm : submittedForm
  }
}

export default {
  createForm,
  submitForm,
};
