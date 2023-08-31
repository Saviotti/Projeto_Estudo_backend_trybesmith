// import { Request, Response, NextFunction } from 'express';
// import productsValidation from './products.validation';
// import userValidation from './user.validation';

// const authUserValidation = async (req: Request, res: Response, next: NextFunction): 
// Promise<unknown | string> => {
//   const { userId, productIds } = req.body;
//   const userValidations = await userValidation(userId);
//   if (userValidations) { return res.status(userValidations.status).json(userValidations.message); }

//   const productValidations = productsValidation(productIds);
//   if (productValidations) { return res.status(productValidations.status).
//     json(productValidations.message); }

//   next();
// };

// export default authUserValidation;