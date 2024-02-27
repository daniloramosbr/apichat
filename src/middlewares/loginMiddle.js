import { findEmail } from "../services/loginService.js";
import bcrypt from "bcrypt";

export const ValidLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findEmail(email);

    if (user < 1) {
      return res.status(404).send({
        message: "usuário ou senha incorretos",
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user[0].password);

    if (!passwordIsValid) {
      return res.status(404).send({
        message: "usuário ou senha incorretos",
      });
    }

    req.id = user[0].id;
    req.user = user[0].username;

    next();
  } catch (error) {
    res.send(error.message);
  }
};
