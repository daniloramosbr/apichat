
import { create, deleteMsg, msgAll} from "../services/messageService.js"

class Controller {

async GetMessages(req, res) {

   try {

    const response = req.res

    res.status(200).send(response) 
    
   } catch (error) {

    res.status(500).send(error.message)
    
   }

}

async PostMessages(req, res) {

   try {

    const body = req.body
    
    create(body)

    res.status(201).send('criado com sucesso!')

    
    
   } catch (error) {

    res.status(500).send(error.message)

   }

}

async DeleteMessages(req, res) {

    try {

      const body = req.body

      const UserOne = body.userid

      const Usertwo = body.fromid

       const resDel = await deleteMsg(UserOne, Usertwo)

      res.status(200).send(resDel)
 
    } catch (error) {
 
     res.status(500).send(error.message)
 
    }
 
 }

 async GetMsgAll (req, res) {

   try {

      const id = req.params.id 

   const response = await msgAll(id)

   res.send(response)
      
   } catch (error) {
      res.send(error.message)
   }

 }

}

export default new Controller()