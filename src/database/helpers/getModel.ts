import { Connection } from "mongoose";

export const getDBModel = async (db : Connection, modelName : string) => {
  return db?.model(modelName);
  }