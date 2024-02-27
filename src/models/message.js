import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({

    user: {
        type: String,
        required: true
    },

    from: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }

})

const message = mongoose.model("messagedb", MessageSchema)

export default message