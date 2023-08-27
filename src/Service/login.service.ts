import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel, { UserSequelizeModel } from '../database/models/user.model';

const SECRET = process.env.JWT_SECRETE || 'secret';

type UserType = {
  username: string,
  password: string
};

type ResponseType = { status: 400 | 401 | 200; message: string };

const nameAndPasswordValidation = (user: UserType): ResponseType | null => {
  if (!user.username || !user.password) {
    return { status: 400, message: '"username" and "password" are required' };
  }
  return null;
};

const userAuth = async (username: string, password: string): Promise<UserSequelizeModel | null> => {
  const user = await UserModel.findOne({ where: { username } });
  if (user && bcrypt.compareSync(password, user.get('password') as string)) {
    return user;
  }
  return null;
};

const getUser = async (user: UserType): Promise<ResponseType> => {
  const validationError = nameAndPasswordValidation(user);
  if (validationError) return validationError;

  const authenticatedUser = await userAuth(user.username, user.password);
  if (!authenticatedUser) {
    return { status: 401, message: 'Username or password invalid' };
  }

  const token = jwt.sign({
    id: authenticatedUser.get('id') as number,
    username: user.username,
  }, SECRET);

  return { status: 200, message: token };
};

export default {
  getUser,
};