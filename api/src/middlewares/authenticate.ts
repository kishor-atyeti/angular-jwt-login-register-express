import { Request, Response, NextFunction } from "express";
import config from "../config/config";
import { verify } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction)=>{

  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ message: "Autoriazation token is required!"});
  }

  try {
    const parsedText = token?.split(" ")[1];
    const decoded = verify(parsedText as string, config.jwtSecret as string);
    const _request = req as AuthRequest;
    _request.userId = decoded.sub as string;

    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized"});
  }

}

export default authenticate;
