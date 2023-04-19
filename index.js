import express from "express"
import { Server } from "socket.io"
import cors from "cors"
import http from "http"
import dotenv from "dotenv"
import mongoose from "mongoose"
import multer from "multer"
import user from "./routes/user.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT
const HOST = process.env.HOST
const MONGO = process.env.MONGO
const SOCKET_PORT = process.env.SOCKET_PORT
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Server working' })
})

const storage = multer.memoryStorage()
const uploadStorage = multer({
    storage: storage,
    limits: {
        fileSize: 150 * 1024 * 1024,
        parts: 150
    }
})

app.post('/upload', uploadStorage.array('file'), async (req, res) => {
    try {
        let names = req.files.map(file => file.originalname)
        const result = s3Uploadv2(req.files, names, 'sandyblaze911@gmail.com')
        res.status(200).json({ status: "success", result })
    } catch (err) {
        res.status(400).json({ status: "failed" })
    }
})

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File exceeds limit' })
        }
    } else {
        return res.status(500).json({ message: 'something went wrong' })
    }
})

app.use('/user', user)

// -------- socket --------

let cache = new Map()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

io.on('connection', (socket) => {
    console.log(socket.id + ' : connection')
    socket.on("connected", (email_id) => {
        socket.join(email_id)
        cache.set(socket.id, email_id)
    })
    socket.on("disconnect", function () {
        socket.leave(cache.get(socket.id))
        cache.delete(socket.id)
        console.log(socket.id + " : disconnected")
    })
})

// ------ socket end ------

// ------- s3 bucket --------

import S3 from "aws-sdk/clients/s3.js"

async function s3Uploadv2(files, keys, user_mail) {
    const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
    const params = files.map((file, index) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: 'upload/' + keys[index],
            Body: file.buffer,
            ContentType: file.mimetype,
        }
    })
    let file_status = new Array(files.length).fill(0)
    await Promise.all(
        params.map((param, index) => {
            file_status[index] = s3.upload(param)
            file_status[index].on('httpUploadProgress', function (progress) {
                let x = (progress.loaded / progress.total * 100).toFixed(2)
                console.log(keys[index] + ' : Upload Progress : ' + x + '%')
                io.sockets.to(user_mail).emit('change', {
                    file_name: keys[index],
                    progress: x
                })
            })
            file_status[index].send(function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data)
                }
                io.sockets.to(user_mail).emit('finish', {
                    status: data
                })
            })
        })
    )
}

// -------- s3 end --------

mongoose.connect(MONGO)
    .then(() => {
        app.listen(PORT, () => {
            console.log('\n\n ----- db connection established -----\n')
            console.log(` ----- click on http://${HOST}:${PORT} -----\n`)
            server.listen(SOCKET_PORT, () => console.log(`socket http://${HOST}:${SOCKET_PORT}`))
        })
    })
    .catch(error => {
        console.log(error)
        console.log('error DB not connected')
    })
