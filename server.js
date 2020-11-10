import mongoose from 'mongoose'
import express from 'express'

const server = express()
server.use(express.json())

mongoose.connect('mongodb://localhost:27017/cats', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Create collection with model
const Cat = mongoose.model('KittyCat', {
  name: { type: String, required: true },
  furr: String,
  color: String,
})
const Student = mongoose.model('Student', { name: String })

server.get('/', (req, res) => {
  Cat.find().then((kitties) => res.json(kitties))
})

server.post('/:kittyName', (req, res) => {
  const { kittyName } = req.params
  const kitty = new Cat({ name: kittyName })
  kitty.save().then(() => res.json(kittyName + ' says meow'))
})

server.patch('/:kittyName', (req, res) => {
  const updatedKitty = req.body
  const kittyName = req.params.kittyName
  Cat.findOneAndUpdate({ name: kittyName }, updatedKitty, { new: true })
    .then((data) => res.json(data))
    .catch((error) => res.send(error.message))
})

const port = 4000

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
