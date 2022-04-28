import { config } from 'dotenv';
import app from './src/app.js';
import pool from './src/pool.js';
config({ path: './config.env' });

pool.connect({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
})
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${process.env.PORT}`);
		});
	})
	.catch((err) => console.error(err));
