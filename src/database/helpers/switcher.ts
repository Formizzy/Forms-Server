import mongoose, { Connection } from "mongoose";
import { submitFormSchema } from "../model/SubmitForm";
import FormRepo from "../repositories/FormRepo";
import { connectDB } from "./connector";

export const switchDatabases = async function ( dbName : string, dbSchema : Map<String, mongoose.Schema>) : Promise<Connection | any>
{
  try {
    const clusterConnection = await connectDB();
    if (clusterConnection) {
      const connectionWithDb = clusterConnection.connection.useDb(dbName, { useCache: true }); 

      // Prevent from schema re-registration
      if (!Object.keys(connectionWithDb.models).length) {
        dbSchema.forEach(( schema: any, modelName: any) => {
          makeModelsFromSchema(modelName, schema, connectionWithDb);
        });
      }
      if (Object.keys(connectionWithDb.models).length === 1 && connectionWithDb.models.form)
      {
        const allFormsOfUser = await FormRepo.getAllForms(dbName, connectionWithDb);
        Object(allFormsOfUser).forEach((form : any) => {
          makeModelsFromSchema(form._id.toString(), submitFormSchema, connectionWithDb);
        })
      }
      return connectionWithDb;
    }
  } catch (error) {
    return error;
  }
}

export const makeModelsFromSchema = function (dbName: string, dbSchema: mongoose.Schema, connectionWithDb: mongoose.Connection) {
  connectionWithDb.model(dbName as string, dbSchema);
}
