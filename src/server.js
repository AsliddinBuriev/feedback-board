import { config } from 'dotenv';
import App from './app.js';
import pool from './pool.js';
config({ path: './config.env' });
const { app } = new App();
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
