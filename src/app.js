import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import errorHandler from './utils/errorHandler.js';
import CustomError from './utils/customError.js';

class App {
	constructor() {
		this.app = express();
		this.middlewares();
		this.routes();
		this.errorHandler();
	}
	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}
	routes() {
		this.app.use('/api/v1/users', userRouter);
		this.app.use('*', (req, res, next) =>
			next(new CustomError('The requested endpoint does not exist', 400))
		);
	}
	errorHandler() {
		app.use(errorHandler);
	}
}

export default App;
