const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const dbConnect = require('./config/dbConnect')
const routes = require('./routes/userRoute')
const cors = require('cors')
const app = express()

dotenv.config()

// Connect to the database
dbConnect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CORS middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());
//endpoints
app.get('/', (req, res) => {
  res.send('API is running...')
})
app.use('/api', routes)

// Server 
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`)
})



