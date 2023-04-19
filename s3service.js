import dotenv from "dotenv"
import S3 from "aws-sdk/clients/s3.js"
dotenv.config()

export default async function s3Uploadv2(files, keys) {
    const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
    const params = files.map((file, index) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: '/' + keys[index],
            Body: file.buffer,
            ContentType: file.mimetype,
        }
    })
    let file_status = new Array(files.length).fill(0)
    await Promise.all(
        params.map((param, index) => {
            file_status[index] = s3.upload(param)
            file_status[index].on('httpUploadProgress', function (progress) {
                console.log(
                    keys[index]
                    + ' : Upload Progress : '
                    + (progress.loaded / progress.total * 100).toFixed(2)
                    + '%'
                )
            })
            file_status[index].send(function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data)
                }
            })
        })
    )
    // return results
}
