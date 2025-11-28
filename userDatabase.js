const pg = require('pg');
const { data } = require('react-router');
const { Client, Pool } = pg;
const pool = new Pool();

class UserDatabase {
    constructor(username, password, host, dbName) {
        if (UserDatabase.instance) {
            return UserDatabase.instance;
        }
        this.database = null;
        this.users = [];
        this.username = username;
        this.password = password;
        this.host = host;
        this.dbName = dbName;
        UserDatabase.instance = this;
    }

    async connect(connectionString) {
        const client = new Client({
            user: this.username,
            password: this.password,
            host: this.host,
            database: this.dbName,
            connectionString: connectionString,
        });
        await client.connect();
        this.database = client;
        console.log('Connected to the database');
        this.users = this.getAllUsers();
    }

    async getAllUsers() {
        if (this.database) {
            try {
                const res = await this.database.query('SELECT * FROM users');
                this.users = res.rows;
                console.log('Users fetched:', this.users);
            } catch (err) {
                console.error('Error executing query', err.stack);
            }
        }
        return this.users;
    }


    async getUserById(id) {
        if (this.database) {
            try {
                const user = await this.database.query('SELECT * FROM users WHERE id = $1', [id]);
                console.log('User fetched by id:', user);
            } catch (err) {
                console.error('Error fetching user by id', err.stack);
            }
        }
        return user;
    }

    async createUser(user) {
        const all = this.getAllUsers();
        const exists = all.find(u => u.id === user.id);
        if (!exists && this.database) {
            const res = await this.database.query(
                'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *',
                [user.name, user.email, user.getRole()],
            );
            console.log('User created with id:', res.rows[0].id);
            this.users.push(res.rows[0]);
        }
    }

    async updateUser(id, updatedUser) {
        if (this.database) {
            const res = await this.database.query(
                'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *',
                [updatedUser.name, updatedUser.email, updatedUser.getRole(), id],
            );
            console.log('User updated with id:', res.rows[0].id);
            const index = this.users.findIndex(u => u.id === id);
            if (index !== -1) {
                this.users[index] = res.rows[0];
            }
        }
    }

    async deleteUser(id) {
        if (this.database) {
            const res = await this.database.query(
                'DELETE FROM users WHERE id = $1 RETURNING *',
                [id],
            );
            console.log('User deleted with id:', res.rows[0].id);
            this.users = this.users.filter(u => u.id !== id);
        }
    }

    async deleteAllUsers() {
        if (this.database) {
            const res = await this.database.query(
                'DELETE FROM users RETURNING *',
                [id],
            );
            console.log('User deleted with id:', res.rows[0].id);
            this.users = this.users.filter(u => u.id !== id);
        }
    }
}

module.exports = UserDatabase;