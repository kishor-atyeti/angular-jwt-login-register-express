import express from 'express';
import { login, me, register } from './UserController';

const UserRoute = express.Router();

UserRoute.post('/register', register);
UserRoute.post('/login', login);
UserRoute.get('/me', me);

export default UserRoute;
