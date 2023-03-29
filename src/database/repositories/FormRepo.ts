import mongoose, { Connection, mongo, Mongoose, Types } from 'mongoose';
import { getDBModel } from '../helpers/getModel';
import { makeModelsFromSchema, switchDatabases } from '../helpers/switcher';
import Form from '../model/Form';
import { userDbSchemas } from '../model/MultiDatabase';
import SubmittedForm, { submitFormSchema } from '../model/SubmitForm';

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

  //creating formId document inside user collection
  makeModelsFromSchema(result._id.toString(), submitFormSchema, userDBConnection)

  return {
    form: result
  };
}

const submitForm = async function (formData: SubmittedForm, formId: string, userDBName: string): Promise<{submittedForm : SubmittedForm}> {

  const userDBConnection: Connection = await switchDatabases(userDBName, userDbSchemas);

  const submittedFormModel = await getDBModel(userDBConnection, formId.toString());

  const submittedFormRecord = {
    formData: formData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }; 

  const submittedForm = await submittedFormModel.create(submittedFormRecord);

  // const pipeline = [
  //   {
  //     $match: { operationType: { $in: ['insert'] } },
  //   }
  // ];

  // const changeStream = submittedFormModel.watch(pipeline);
  // changeStream.on('change', async (next) => {
  //   console.log(next);
  //   const formModel = await getDBModel(userDBConnection, 'form');
  //   const result = await formModel.updateOne({ _id: formId },{ $inc: { totalSubmissions: 1 }}).lean();
  // });

  if (submittedForm)
  {
    const criteria : Record<string, any> = {};
    criteria._id = new mongoose.Types.ObjectId(formId.toString());

    const parametersToUpdate = {
      $inc: { "totalSubmissions" : 1 }
    }
    const form = await findOneAndUpdateForm(criteria, parametersToUpdate, userDBName);

    return form;
  }

  return {
    submittedForm
  }
}

const getFormsByCriteria = async function (connection: Connection, criteria: Object = {}) {
  const formModel = await getDBModel(connection, 'form');
  const result = await formModel.find(criteria).lean();
  return result;
}

const findOneAndUpdateForm = async function (criteria: Object, parametersToUpdate: Object, userDBName: string) {
  const userDBConnection : Connection = await switchDatabases(userDBName, userDbSchemas);
  const formModel = await getDBModel(userDBConnection, 'form');

  const result = await formModel.findOneAndUpdate(criteria, parametersToUpdate).lean();

  return result;
}

export default {
  createForm,
  submitForm,
  getFormsByCriteria,
  findOneAndUpdateForm,
};
