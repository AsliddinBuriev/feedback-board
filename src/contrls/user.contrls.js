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
		res.status(200).json({
			message: 'User found',
			data: { user },
		});
	});
	static updateUser = catchAsyncErr(async (req, res, next) => {
		const user = await UserRepo.update(req.params.userId, req.body);
		res.status(200).json({
			message: 'User updated',
			data: { user },
		});
	});
	static deleteUser = catchAsyncErr(async (req, res, next) => {
		const user = await UserRepo.delete(req.params.userId);
		res.status(200).json({
			message: 'User deleted',
			data: { user },
		});
	});
}
export default UserContrls;
