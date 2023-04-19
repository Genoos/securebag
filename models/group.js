import mongoose from "mongoose"
import user from "./user.js"

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
    }],
})

export default mongoose.model("group", groupSchema)
