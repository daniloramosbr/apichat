import { createLogin, getUsers } from "../services/loginService.js";
import generateToken from "../services/loginService.js";

class UserController {
  async PostUser(req, res) {
    try {
      const body = req.body;

      const user = await createLogin(body);

      const token = generateToken(user.id, user.username);

      res.status(201).send(token);
    } catch (error) {
      res.send(error.message);
    }
  }

  async GetUser(req, res) {
    const id = req.params.id;

    try {
      const response = await getUsers();

      let resFilter = response.filter((res) => {
        return res._id != id;
      });

      resFilter.shift()

      resFilter.push({
        _id: "65cfb095cfecc8d71216fc35",
        username: "Danilo Ramos",
      });

      resFilter.reverse();

      res.send(resFilter);
      
    } catch (error) {
      res.send(error.message);
    }
  }

  async ValidEmail(req, res) {
    try {
      const token = generateToken(req.id, req.user);

      res.status(201).send(token);
    } catch (error) {
      res.send(error);
    }
  }
}

export default new UserController();
