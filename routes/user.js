import express from "express"
import UserController from "../controllers/user.js"

const app = express.Router()
const userCtrl = UserController()

app.route('/login')
    .post(async (req, res) => {
        
        res.status(200).json(await userCtrl.login(req.body))
    })

app.route('/register')
    .post(async (req, res) => {
        res.status(200).json(await userCtrl.createUser(req.body))
    })

app.route('/getfile')
    .post(async (req, res) => {
        console.log("req",req.body)
        res.status(200).json(await userCtrl.getfile(req.body))
    })



const user = app
export default user
