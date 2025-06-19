const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const dbConnect = require('../config/dbConnect')
const routes = require('../routes/userRoute')
const cors = require('cors')
const app = express()

dotenv.config()

// Connect to the database
dbConnect()


// CORS middleware
app.use(cors({
  origin: 'https://multi-form-validation-nine.vercel.app', // specific allowed origin
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.options('*', cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// app.get('/', (req, res) => {
//   res.send('API is running...')
// })
app.use('/api', routes)

// Server 
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`)
})

module.exports = app;

