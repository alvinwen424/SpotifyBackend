const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Event = mongoose.model('event')

const app = express()

const MONGO_URI = 'mongodb://alvinwen424:testing123@ds127811.mlab.com:27811/spotifybackend'
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI')
}

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI)
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error))


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/upload', (req, res, next) => {
  // req.body is the userdata file
  let {name, content, startTime, endTime } = req.body
  console.log('backend')
  Event({
    name,
    content,
    startTime,
    endTime
  }).save()
  .then(resp => {

    res.send(`finished uploading, event id ${res.json(resp).id}`)
  })
  .catch(next)

})

app.get('/:id', (req, res, next) => {
  Event.findById(req.params.id)
  .then(resp => {
    res.send(res.json(resp))
  })
})

app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || "Internal server error")
})

app.listen(1337, () => {
  console.log('Now listening on port 1337')
})
