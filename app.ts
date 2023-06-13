import express from 'express';
import bodyParser from 'body-parser';
import socketIo from './socket';
import mongoose from 'mongoose';

import messagesRouter from './routes/messages'

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.mb2j7mq.mongodb.net/?retryWrites=true&w=majority`

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(messagesRouter);

mongoose.connect(MONGO_URI).then(result => {
	const server = app.listen(process.env.PORT || 8080, () => {
		console.log(`Server is running on port ${process.env.PORT || 8080}`);
	});

	const io = socketIo.init(server);
	io.on('connection', (socket: any) => {
		console.log(`Client ${socket.id} connected.`);
	});
}).catch(error => {
	console.log(error);
});
