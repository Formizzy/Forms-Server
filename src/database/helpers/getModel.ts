import { Connection } from "mongoose"

export const getDBModel = async (db : Connection | undefined, modelName : string) => {
    return db?.model(modelName)
  }