import { Request, Response, NextFunction } from 'express';

const priceValidation = (req: Request, res: Response, next: NextFunction): void | Response => {
  const { price } = req.body;
  if (!price) {
    return res.status(400).json({ message: '"price" is required' });
  }
  if (typeof price !== 'string') {
    return res.status(422).json({ message: '"price" must be a string' });
  }
  if (price.length <= 2) {
    return res.status(422).json({ message: '"price" length must be at least 3 characters long' });
  }
  next();
};

export default priceValidation;