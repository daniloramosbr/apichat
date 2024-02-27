import { FindMessages } from "../services/messageService.js";

export const validMsg = async (req, res, next) => {
  try {
    const body = req.body;

    const response = await FindMessages(body.user, body.from);
    req.res = response;

    next();
  } catch (error) {
    res.send(error.message);
  }
};
