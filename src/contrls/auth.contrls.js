import catchAsyncErr from './contrl-utils/catchAsyncErr';

class AuthContrls {
	static signUp = catchAsyncErr(async (req, res, next) => {
		const user = await UserRepo.insert(req.body);
	});
	static logIn = catchAsyncErr(async (req, res, next) => {
		const user = await UserRepo.findOne(req.body.email);
	});
	static authorize = catchAsyncErr(async (req, res, next) => {});
	static updatePwd = catchAsyncErr(async (req, res, next) => {});
	static resetPwd = catchAsyncErr(async (req, res, next) => {});
}
