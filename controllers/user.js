import user from "../models/user.js"
import file from "../models/file.js"
import mongoose from "mongoose"

export default function UserController() {
    return {
        login: async function ({ email, passwd }) {
            try {
                const result = await user.findOne({ email, passwd })
                return result
            } catch (e) {
                return { ...e, errno: 404 }
            }
        },
        createUser: async function ({ email, name, passwd }) {
            try {
                const new_user = new user({ email, name, passwd })
                result = await new_user.save()
                console.log("user created ", result)
                return result
            } catch (e) {
                return { ...e, errno: 403 }
            }
        },
        getfile: async function ({email,passwd}){
            try{
                const user = await user.findOne({ email, passwd })
                const result = await file.find({ user_id: user._id })
                console.log("user files ", result)
        return result
            }catch(e){
                return {...e,errno:404}
            }
        }
    }
}
