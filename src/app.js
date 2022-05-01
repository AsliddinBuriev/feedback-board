import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import errorController from './utils/errorHandler.js';
import CustomError from './utils/customError.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('*', (req, res, next) =>
	next(new CustomError('The requested endpoint does not exist', 400))
);
app.use(errorController);
export default app;
