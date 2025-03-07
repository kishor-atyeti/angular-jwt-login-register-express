import { Request, Response, NextFunction } from "express";
import createHttpError from 'http-errors';
import UserSchema from "./UserSchema";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from "../config/config";
import { AuthRequest } from "../middlewares/authenticate";

/**
 * This method is used to register the user into the system.
 * @param req: The request body
 * @param res: The response
 * @param next
 * @returns
 */
const register = async (req: Request, res: Response, next: NextFunction)=>{
  const {name, email, password } = req.body;

  if(!name || !email || !password) {
    res.status(400).json({error: "All fields are required"});
    return;
  }

  const user = await UserSchema.findOne({email});

  if (user) {
    res.status(400).json({error: "User already exists!"});
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserSchema.create({
      name, email, password: hashedPassword
    });

    res.status(201).json({
      status: true,
      message: "User is created",
      data: { _id: newUser.id, email: newUser.email }
    });
    return;
  } catch (error) {
    res.status(500).json({error:"Something went wrong"});
    return;
  }
};

/**
 * This method used to login the user to the system
 * @param req
 * @param res
 * @param next
 */
const login = async (req: Request, res: Response, next: NextFunction)=>{
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All fields are required"});
    return;
  }

  const user = await UserSchema.findOne({ email });
  if (!user) {
    res.status(400).json({error: "User not found"});
    return;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    res.status(400).json({ error: "Incorrect credentials"});
    return;
  }

  try {
    const token = sign({ sub: user._id}, config.jwtSecret as string, { expiresIn: '1d'});
    res.status(200).json({
      status: true,
      message: 'User Logged In',
      data: { _id:user._id, email:user.email, name:user.name},
      token
    });
    return;
  } catch (error) {
    res.status(500).json({error:"Something went wrong"});
    return;
  }
};

/**
 * This method used to fetch the profile of current user
 * @param req
 * @param res
 * @param next
 */
const me = async (req: Request, res: Response, next: NextFunction)=>{
  const _request = req as AuthRequest;
  const user = await UserSchema.findById(_request.userId);
  if (user) {
    res.status(200).json({
      status: true,
      data: { _id:user.id, email: user.email, name: user.name }
    });
    return;
  }
};

export {
  register, login, me
}
