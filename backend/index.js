const connectToMongo = require('./db');
var cors = require('cors')
connectToMongo();
const express = require('express');
// const { route } = require('./routes/auth');
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello User!')
})
app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})