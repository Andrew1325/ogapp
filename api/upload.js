const express = require('express')
const multer = require('multer')

const app = express()

const fileFilter = function(req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg', 'application/pdf']
  if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Wrong file type')
      error.code = 'LIMIT_FILE_TYPES'
      return cb(error, false)
  }
  cb(null, true)
}

const MAX_SIZE = 750000

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/../static')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
      fileSize: MAX_SIZE
  },
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, x-access-token, user-details, event-booking')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  }
  else {
    next()
  }
})

app.get('/', (req, res, next) => {
  res.send('Api Root')
})

app.post('/', upload.single('file'), (req, res) => {
  res.json({ file: req.file })
})

module.exports = {
  path: "/api/upload",
  handler: app
}