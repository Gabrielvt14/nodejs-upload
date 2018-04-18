const express = require('express')
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
// const xlsxtojson = require('xlsx-to-json')
// const xlstojson = require('xls-to-json')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        let ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1)
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
    }
})

const upload = multer({ storage: storage })

const app = express()

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/file', upload.single('avatar'), (req, res, next) => {
    console.log(req.file)
})

app.listen(3000, () => console.log('API has been started at http://localhost:3000'))