import mongoose from "mongoose"
import user from "./user.js"
import group from "./group.js"

const fileSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: user,
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: group,
    },
    directory: {
        type: Boolean,
        default: false,
    },
    children: {
        type: Array,
        default: [],
    },
    location: {
        type: String,
        required: true,
    },
})

fileSchema.index({ user_id: 1, group_id: 1 }, { unique: true })
fileSchema.index({ group_id: 1, user_id: 1 }, { unique: true })

export default mongoose.model("file", fileSchema)