import mongoose from "mongoose"

const individualFileSchema = new Schema({
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
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
})

individualFileSchema.index({ user_id: 1, group_id: 1, name: 1 })
individualFileSchema.index({ group_id: 1, user_id: 1, name: 1 })
individualFileSchema.index({ user_id: 1, name: 1 })

export default mongoose.model('individualFile', individualFileSchema)
