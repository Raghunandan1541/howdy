require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const socketServer = require('./socketServer')


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const port = process.env.PORT || 5000

// Socket
const io = require('socket.io')(8900, {
	cors: {
		origin: true
	}
})

// Connection
io.on('connection', (socket) => {
	socketServer(socket, io)
})



// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/apiRouter'))


const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
	useCreateIndex: true,
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => {
	if(err) throw err;
	console.log('Connected to mongodb')
})

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
	})
}


app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})