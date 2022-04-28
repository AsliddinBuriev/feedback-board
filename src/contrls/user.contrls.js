class UserContrls {
	static async getAllUsers(req, res, next) {
		try {
			res.status(200).json({
				message: 'Handling GET requests to /users',
			});
		} catch (err) {
			next(err);
		}
	}
	static async createUser(req, res, next) {
		try {
			res.status(201).json({
				message: 'Handling POST requests to /users',
			});
		} catch (err) {
			next(err);
		}
	}
	static async getUserById(req, res, next) {
		try {
			res.status(200).json({
				message: 'Handling GET requests to /users/:userId',
			});
		} catch (err) {
			next(err);
		}
	}
	static async updateUser(req, res, next) {
		try {
			res.status(200).json({
				message: 'Handling PATCH requests to /users/:userId',
			});
		} catch (err) {
			next(err);
		}
	}
	static async deleteUser(req, res, next) {
		try {
			res.status(200).json({
				message: 'Handling DELETE requests to /users/:userId',
			});
		} catch (err) {
			next(err);
		}
	}
}
export default UserContrls;
