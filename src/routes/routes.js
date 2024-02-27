import Router from "express";
import controller from "../controllers/controller.js";
import userController from "../controllers/userController.js";
import { validMsg } from "../middlewares/messageMiddle.js";
import { validUser } from "../middlewares/userMiddle.js";
import { ValidLogin } from "../middlewares/loginMiddle.js";

const routes = Router()

routes.post('/message', validMsg, controller.GetMessages)
routes.post('/newmessage', controller.PostMessages)
routes.post('/login', validUser, userController.PostUser)
routes.get('/users/:id', userController.GetUser)
routes.post('/messagedelete', controller.DeleteMessages)
routes.post('/validlogin', ValidLogin, userController.ValidEmail)
routes.get('/message/:id', controller.GetMsgAll)


export default routes