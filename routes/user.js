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

app.route('/getsub')
    .post(async (req, res) => {
        console.log("req",req.body)
        res.status(200).json(await userCtrl.getsub(req.body))
    })

app.route('/createFolder').post(
     async (req, res) => {
        try{
            console.log("req body",req.body)
            let result = await userCtrl.createfolder(req.body)
            res.status(200).json({status:"success",result})
        }catch(e){
            console.log(e)
        }
    })

app.route('/createFile')
    .post(async (req, res) => {
        try{
            req.body.link = "https://www.google.com"
            console.log("req body",req.body)
            let result = await userCtrl.createfile(req.body)
            res.status(200).json({status:"success",result})
        }catch(e){
            console.log(e)
        }

})
    



const user = app
export default user
