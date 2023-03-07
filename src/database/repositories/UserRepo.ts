import User, { UserModel } from '../model/User';
import Jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

// // contains critical information of the user
async function findById(id: Types.ObjectId): Promise<User | any> {
  return UserModel.findOne({ _id: id })
    .lean()
    .exec();
}

async function findByEmail(email: string): Promise<User | any> {
  return UserModel.findOne({ email: email })
    .select(
      '+firstName +lastName',
    )
    .lean()
    .exec();
}

async function createUser(
  user: User,
): Promise<{ user: User }> {

  const now = new Date();

  user.formIds = [];

  user.createdAt = user.updatedAt = now;

  const createdUser = await UserModel.create(user);

  return {
    user: { ...createdUser.toObject() }
  };
}

export default {
  findById,
  findByEmail,
  createUser,
};
