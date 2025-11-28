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

    getAllUsers() {
        if(this.database) {
            this.database.query('SELECT * FROM users', (err, res) => {
                if (err) {
                    console.error('Error executing query', err.stack);
                } else {
                    this.users = res.rows;
                    console.log('Users fetched:', this.users);
                }
            });
        }
        return this.users;
    }

    getUserById(id) {
        if (this.database) {
            this.database.query(
                'SELECT * FROM users WHERE id = $1',
                [id],
                (err, res) => {
                    if (err) {
                        console.error('Error executing query', err.stack);
                    } else {
                        console.log('User fetched with id:', id, res.rows[0]);
                        return res.rows[0];
                    }
                }
            );
        }
    }

    createUser(user) {
        const all = this.getAllUsers();
        const exists = all.find(u => u.id === user.id);
        if (!exists && this.database) {
            this.database.query(
                'INSERT INTO users (id, name, email, role) VALUES ($1, $2, $3, $4)',
                [user.id, user.name, user.email, user.role],
                (err, res) => {
                    if (err) {
                        console.error('Error executing query', err.stack);
                    } else {
                        console.log('User saved:', user);
                        this.users.push(user);
                    }
                }
            );
        }
    }

    updateUser(id, updatedUser) {
        if (this.database) {
            this.database.query(
                'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4',
                [updatedUser.name, updatedUser.email, updatedUser.role, id],
                (err, res) => {
                    if (err) {
                        console.error('Error executing query', err.stack);
                    } else {
                        console.log('User updated with id:', id);
                        this.users = this.users.map(u => u.id === id ? updatedUser : u);
                    }
                }
            );
        }
    }

    deleteUser(id) {
        if (this.database) {
            this.database.query(
                'DELETE FROM users WHERE id = $1',
                [id],
                (err, res) => {
                    if (err) {
                        console.error('Error executing query', err.stack);
                    } else {
                        console.log('User deleted with id:', id);
                        this.users = this.users.filter(u => u.id !== id);
                    }
                }
            );
        }
    }

    deleteAllUsers() {
        if (this.database) {
            this.database.query(
                'DELETE FROM users',
                (err, res) => {
                    if (err) {
                        console.error('Error executing query', err.stack);
                    } else {
                        console.log('All users deleted');
                        this.users = [];
                    }
                }
            );
        }
    }
}

module.exports = UserDatabase;