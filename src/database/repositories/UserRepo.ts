import User from '../model/User';
import { masterDbSchemas } from '../model/MultiDatabase';
import { switchDatabases } from '../helpers/switcher';
import { getDBModel } from '../helpers/getModel';
import { Types } from 'mongoose';
import { sendVerificationEmail } from '../helpers/verifcationEmailSender';

// // contains critical information of the user
async function findById(id: Types.ObjectId): Promise<User | any> {

  let masterDBConnection = await switchDatabases('masterDB', masterDbSchemas);

  const userModel = await getDBModel(masterDBConnection, 'user');

  const result = await userModel?.findOne({ _id: id })
    .lean()
    .exec();

  return result;
}

async function findByEmail(email: string): Promise<User | any> {

  let masterDBConnection = await switchDatabases('masterDB', masterDbSchemas);

  const userModel = await getDBModel(masterDBConnection, 'user');

  const result = await userModel?.findOne({ email: email })
    .select(
      '+firstName +lastName +password',
    )
    .lean()

  return result;
}


async function createUser(
  user: User | any,
): Promise<User> {

  let masterDBConnection = await switchDatabases('masterDB', masterDbSchemas);

  const userModel = await getDBModel(masterDBConnection, 'user');

  const now = new Date();

  user.formIds = [];

  user.createdAt = user.updatedAt = now;

  const createdUser: User = await userModel?.create(user);

  sendVerificationEmail(createdUser);
  
  return createdUser
}

//user email verification

async function verifyUserEmail(
  user: User | any,
): Promise<User> {

  let masterDBConnection = await switchDatabases('masterDB', masterDbSchemas);

  const userModel = await getDBModel(masterDBConnection, 'user');

  const verifiedUser = await userModel?.findOneAndUpdate(user._id, { isEmailVerified: true }, { new: true }).lean();

  return verifiedUser;
}

export default {
  findById,
  findByEmail,
  createUser,
  verifyUserEmail
};