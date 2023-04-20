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
        getfile: async function ({user_id, file_id}){
            if(file_id == null){

                try{ 
                    const result = await file.find({ user_id: user_id ,location:"/"})
                    console.log("user files ", result)
                    return result
                }catch(e){
                    return {...e,errno:404}
                }
            }
            
        },
        getsub: async function ({parent}){
            try{
                const result = await file.find({parent:parent})
                return result
            }catch(e){
                return {...e,errno:404}
            }
        },
        createfolder: async function ({user_id, group_id, name,directory, location, parent}){
            try{  
                if(directory){
                    const new_file = new file({user_id, group_id, name, parent, location,directory})
                    result = await new_file.save()
                    console.log("file created ", result)
                    return result
                }
            }catch(e){
                return {...e,errno:403}
            }
        },
        createfile: async function ({user_id, group_id, name, link, location, parent}){
            try{  
                const new_file = new file({user_id, group_id, name, parent, location,link})
                result = await new_file.save()
                console.log("file created ", result)
                return result
            }catch(e){
                return {...e,errno:403}
            }
        }
    }
}
