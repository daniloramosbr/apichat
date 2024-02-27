import user from "../models/user.js";
import Jwt from "jsonwebtoken";

export const createLogin = (body) => user.create(body)
export const getUsers = () => user.find().select('-password').select('-email')
export const findEmail = (email) => user.find({email: email})
export default function generateToken(id, user) {
    return Jwt.sign({ id: id, user: user }, '634652446', { expiresIn: 86400 });
  }