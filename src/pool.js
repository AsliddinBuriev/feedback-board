import pg from 'pg';

class Pool {
	_pool = null;
	connect = (opt) => {
		this._pool = new pg.Pool(opt);
		return this._pool.query('SELECT 1 + 1;');
	};
	close = () => {
		this._pool.end();
	};
	query = (sql, params) => {
		return this._pool.query(sql, params);
	};
}
export default new Pool();
