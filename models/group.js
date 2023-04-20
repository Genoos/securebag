import mongoose,{Schema} from "mongoose"
import user from "./user.js"

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
})

export default mongoose.model("group", groupSchema)
