import Pool from '../pool.js';
import camelCase from './repo-utils/camelCase.js';
class UserRepo {
	static async find() {
		const sql = `SELECT * FROM users`;
		const { rows } = await Pool.query(sql);
		return camelCase(rows);
	}
	static async findById(id) {
		const sql = `
		SELECT * FROM users 
		WHERE id = $1`;
		const { rows } = await Pool.query(sql, [id]);
		return rows[0];
	}
	static async findOne(email) {
		const sql = `SELECT * FROM users WHERE email = $1`;
		const { rows } = await Pool.query(sql, [email]);
		return rows[0];
	}
	static async insert(body) {
		const values = [body.username, body.email, body.password];
		const sql = `
		INSERT INTO users (username, email, password) 
		VALUES ($1, $2, $3) 
		RETURNING *`;
		const { rows } = await Pool.query(sql, values);
		return rows[0];
	}
	static async update(id, body) {
		const sql = `
		UPDATE users
		SET username = $1,email = $2
		WHERE id = $3
		`;
		const values = [body.username, body.email, id];
		const { rows } = await Pool.query(sql, values);
	}
	static async delete(id) {}
}

export default UserRepo;
