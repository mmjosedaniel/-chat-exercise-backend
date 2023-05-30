import express from 'express';
import bodyParser from 'body-parser';

import messagesRouter from './routes/messages'

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next();
});

app.use(messagesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
