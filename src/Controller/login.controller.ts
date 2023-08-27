import { Request, Response } from 'express';
import loginService from '../Service/login.service';

type LoginResponseType = {
  status: 200 | 400 | 401;
  message: string;
};

const getUser = async (req: Request, res: Response): Promise<Response> => {
  const response: LoginResponseType = await loginService.getUser(req.body);
  const { status, message } = response;

  if (status !== 200) {
    return res.status(status).send({ message });
  }

  return res.status(status).json({ token: message });
};

export default {
  getUser,
};