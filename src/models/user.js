import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    }

})

UserSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
    })

const user = mongoose.model("usersdb", UserSchema)

export default user