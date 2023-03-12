import mongoose, { Connection } from "mongoose";
import { connectDB } from "./connector";

export const switchDatabases = async function ( dbName : string, dbSchema : Map<String, mongoose.Schema>) : Promise<Connection | undefined>
{
  try {
    const clusterConnection = await connectDB();
    if (clusterConnection) {
      const connectionWithDb = clusterConnection.connection.useDb(dbName, { useCache: true });

      // Prevent from schema re-registration
      if (!Object.keys(connectionWithDb.models).length) {
        dbSchema.forEach((schema: any, modelName: any) => {
          connectionWithDb.model(modelName, schema);
        });
      }

      return connectionWithDb;
    }
  } catch (error : any) {
    return error;
  }
}