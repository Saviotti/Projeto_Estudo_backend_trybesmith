import { Router } from 'express';
import loginController from '../Controller/login.controller';

const loginRouter = Router();
loginRouter.post('/', loginController.getUser);

export default loginRouter;