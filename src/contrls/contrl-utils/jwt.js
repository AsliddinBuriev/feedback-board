import jsonwebtoken from 'jsonwebtoken';
class Jwt {
	constructor() {
		this.secret = process.env.JWT_SECRET;
		this.expiresIn = process.env.JWT_EXPIRES_IN;
	}
	static sign(id) {
		const cb = (err, token) => {
			if (err) return reject(err);
			else return resolve(token);
		};
		return new Promise((resolve, reject) => {
			jsonwebtoken.sign(
				{ id: id },
				this.secret,
				{ expiresIn: this.expiresIn },
				cb
			);
		});
	}
	static verify(token) {
		return new Promise((resolve, reject) => {
			const cb = (err, decoded) => {
				if (err) return reject(err);
				else return resolve(decoded);
			};
			jsonwebtoken.verify(token, this.secret, cb);
		});
	}
}
