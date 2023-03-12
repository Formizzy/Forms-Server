import User from '../model/User';
import { masterDbSchemas } from '../model/MultiDatabase';
import { switchDatabases } from '../helpers/switcher';
import { getDBModel } from '../helpers/getModel';
import { Types } from 'mongoose';

// // contains critical information of the user
async function findById(id: Types.ObjectId): Promise<User | any> {
  
  let materDBConnection = await switchDatabases('masterDB', masterDbSchemas);

  const userModel = await getDBModel(materDBConnection,'user');

  const result = await userModel?.findOne({ _id: id })
  .lean()
  .exec();

  return result;
}

async function findByEmail(email: string): Promise<User | any> {

  let materDBConnection = await switchDatabases('masterDB', masterDbSchemas);

  const userModel = await getDBModel(materDBConnection,'user');

  const result = await userModel?.findOne({ email: email })
    .select(
      '+firstName +lastName',
    )
    .lean()
    .exec();
    return result;
}


async function createUser(
  user: User,
): Promise<{ user: User }> {

  let materDBConnection = await switchDatabases('masterDB', masterDbSchemas);

  const userModel = await getDBModel(materDBConnection,'user');

  const now = new Date();

  user.formIds = [];

  user.createdAt = user.updatedAt = now;

  const createdUser = await userModel?.create(user);

  return {
    user: { ...createdUser.toObject() }
  };
}

export default {
  findById,
  findByEmail,
  createUser,
};
