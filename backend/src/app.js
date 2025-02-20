import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = new express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


//routes
import userRoutes from './routes/user.route.js';
import questionRoutes from './routes/question.route.js';
import resultRoutes from './routes/result.route.js';
import testRoutes from './routes/test.route.js';

//routes declaration
app.use('/api/auth', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/tests', testRoutes);

export default app;
