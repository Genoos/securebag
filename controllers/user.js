import user from "../models/user.js"

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
                return result
            } catch (e) {
                return { ...e, errno: 403 }
            }
        }
    }
}
