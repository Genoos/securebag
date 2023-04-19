import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import multer from "multer"
import s3Uploadv2 from "./s3service.js"
import user from "./routes/user.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT
const HOST = process.env.HOST
const MONGO = process.env.MONGO
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
        const result = s3Uploadv2(req.files, names)
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

mongoose.connect(MONGO)
    .then(() => {
        app.listen(PORT, () => {
            console.log('\n\n ----- db connection established -----\n')
            console.log(` ----- click on http://${HOST}:${PORT} -----\n`)
        })
    })
    .catch(error => {
        console.log(error)
        console.log('error DB not connected')
    })
