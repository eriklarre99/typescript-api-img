import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import path from 'path'

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 5000);


// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routes
import indexRoutes from './routes/index'
app.use('/api', indexRoutes)

import { indexPage } from './controllers/photo.controller'
app.get('/', indexPage);

// this folder will used to store public files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;