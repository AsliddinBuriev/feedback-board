import pg from 'pg';
import { config } from 'dotenv';
config({ path: './config.env' });
const pool = new pg.Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
});

const up = async () => {
	pool.query(
		`CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY NOT NULL,
			username VARCHAR(50) NOT NULL,
			email VARCHAR(50) NOT NULL UNIQUE,
			password VARCHAR(255) NOT NULL,
			password_changed_at TIMESTAMP,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
			password_reset_token VARCHAR(255),
			password_reset_expires TIMESTAMP
		);
		CREATE TABLE IF NOT EXISTS projects (
			id SERIAL PRIMARY KEY NOT NULL,
			user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
			title VARCHAR(100) NOT NULL,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
			description VARCHAR(255),
			url VARCHAR(255),
			github_link VARCHAR(255),
			cover_image VARCHAR(255),
			images VARCHAR[]
		);
		CREATE TABLE IF NOT EXISTS suggestions (
			id SERIAL PRIMARY KEY NOT NULL,
			user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
			product_id INTEGER REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
			title VARCHAR(100) NOT NULL,
			category VARCHAR(50) NOT NULL,
			status VARCHAR(50) NOT NULL DEFAULT 'planned', 
			created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
		);
		CREATE TABLE IF NOT EXISTS votes (
			id SERIAL PRIMARY KEY NOT NULL,
			user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
			suggestion_id INTEGER REFERENCES suggestions(id) ON DELETE CASCADE,
			product_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
			CHECK (
				COALESCE((suggestion_id)::BOOLEAN::INTEGER, 0)
				+ 
				COALESCE((product_id)::BOOLEAN::INTEGER, 0)
				= 1
			),
			UNIQUE (user_id, suggestion_id, product_id)
		);
		CREATE TABLE IF NOT EXISTS tags (
			id SERIAL PRIMARY KEY NOT NULL,
			user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
			product_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
			suggestion_id INTEGER REFERENCES suggestions(id) ON DELETE CASCADE,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
			CHECK (
				COALESCE((suggestion_id)::BOOLEAN::INTEGER, 0)
				+ 
				COALESCE((product_id)::BOOLEAN::INTEGER, 0)
				= 1
			),
			UNIQUE (user_id, suggestion_id, product_id)
		);
		CREATE TABLE IF NOT EXISTS followers (
			id SERIAL PRIMARY KEY NOT NULL,
			leader_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
			follower_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
			UNIQUE (leader_id, follower_id),
			CHECK (leader_id <> follower_id)
		);
		CREATE TABLE IF NOT EXISTS reply (
			id SERIAL PRIMARY KEY NOT NULL,
			user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
			suggestion_id INTEGER REFERENCES suggestions(id) ON DELETE CASCADE NOT NULL,
			content VARCHAR(255) NOT NULL,
			cteatd_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
		);`
	);
};
const down = async () => {
	pool.query(
		`DROP TABLE IF EXISTS suggestions, projects, users, votes, tags, followers, reply`
	);
};

if (process.argv[2] === 'up') up();
else if (process.argv[2] === 'down') down();
