import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './router';
import session from 'express-session';
import './types';

dotenv.config({ path: './config/.env' });

const app = express();
const sessionConfig = {
  secret: process.env['SESSION_SECRET'] as string,
  resave: false,
  saveUninitialized: true,
}

app.use(cors());
app.use(express.json());
app.use(session(sessionConfig))

app.use(router);

app.listen(process.env['PORT'], () => {
  console.log('Server is running on port', process.env['PORT']);
});
