import CustomError from './customError.js';
export default (err, req, res, next) => {
	const error = customize(err);
	if (process.env.NODE_ENV === 'development') {
		res.status(error.statusCode).json({
			err,
		});
	} else if (process.env.NODE_ENV === 'production') {
		if (!error.isOperational) {
			error.statusCode = 500;
			error.status = 'error';
			error.message = 'Something went wrong';
		}
		res.status(error.statusCode).json({
			status: error.status,
			message: error.message,
		});
	}
};

function customize(err) {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	const error = Object.create(err);
	if (error.name === 'TokenExpiredError')
		error = new CustomError('Pease log in again!', 401);
	if (error.name === 'JsonWebTokenError')
		error = new CustomError('Pease log in again!', 401);
	return error;
}
