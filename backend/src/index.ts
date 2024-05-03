import express from 'express';
import cors from 'cors'
import logger from 'morgan';

// routes
import streamController from './modules/stream/stream.controller'

const app = express();
app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.use('/stream', streamController);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on url http://localhost:${PORT}`);
})