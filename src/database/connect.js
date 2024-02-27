import mongoose from "mongoose";

export const ConnectDB = () => {

    console.log('tentando fazer conexão ao banco de dados...')

    mongoose.connect(process.env.MONGO_URL).then(()=> {

        console.log('conectado ao banco de dados!')

    }).catch((err)=> {

        console.log(err)

    })

}