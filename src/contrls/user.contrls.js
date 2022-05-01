import UserRepo from '../repos/user.repos.js';
import catchAsyncErr from './contrl-utils/catchAsyncErr.js';
import CustomError from '../utils/customError.js';

class UserContrls {
	static getAllUsers = catchAsyncErr(async (req, res, next) => {
		const users = await UserRepo.find();
		res.status(200).json({
			message: 'All users',
			data: { users },
		});
	});
	static getUserById = catchAsyncErr(async (req, res, next) => {
		const user = await UserRepo.findById(req.params.userId);
		if (!user) return next(new CustomError('User not found', 404));
		res.status(200).json({
			message: 'User found',
			data: { user },
		});
	});
	static createUser = catchAsyncErr(async (req, res, next) => {
		const user = await UserRepo.insert(req.userId, req.body);
		res.status(201).json({
			message: 'User created',
			data: { user },
		});
	});

	static updateUser = catchAsyncErr(async (req, res, next) => {
		res.status(200).json({
			message: 'Handling PATCH requests to /users/:userId',
		});
	});
	static deleteUser = catchAsyncErr(async (req, res, next) => {
		res.status(200).json({
			message: 'Handling DELETE requests to /users/:userId',
		});
	});
}
export default UserContrls;
