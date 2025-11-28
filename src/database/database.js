const { Client } = require('pg');
require("dotenv").config();

class Database {
  constructor(
    user = process.env.DB_USER, 
    password = process.env.DB_PASSWORD, 
    host = process.env.DB_HOST, 
    dbName = process.env.DB_NAME,
    port = process.env.DB_PORT || 5432) 
    {
    if (Database.instance) return Database.instance
    this.user = user;
    this.password = password;
    this.host = host;
    this.dbName = dbName;
    this.port = port;
    this.client = null;
    this.allUsers = [];
    this.users = [];
    this.admins = [];
    this.superAdmins = [];
    Database.instance = this;
  }

  async connect() {
    try {
      this.client = new Client({
        user: this.user,
        password: this.password,
        host: this.host,
        database: this.dbName,
        port: this.port,
      });
      await this.client.connect();
      console.log('SUCCESS: Connected to the database');

      await this.client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          role VARCHAR(50) NOT NULL
        );
      `);
      console.log('SUCCESS: Users table is ready');

      await this.getAllUsers();
      return this.client;
    } catch (err) {
      console.error('WARNING: Database connection error', err.stack);
      return null;
    }
  }

  async getAllUsers() {
    if (!this.client) return [];
    try {
      const res = await this.client.query('SELECT * FROM users');
      this.allUsers = res.rows;
      console.log('Got all users', this.allUsers);
      return this.allUsers;
    } catch (err) {
      console.error('Error executing query', err.stack);
      return [];
    }
  }

  async getUserById(id) {
    if (!this.client) return null;
    try {
      const res = await this.client.query('SELECT * FROM users WHERE id = $1', [id]);
      return res.rows[0] || null;
    } catch (err) {
      console.error('Error fetching user by id', err.stack);
      return null;
    }
  }

  async createUser(user) {
    if (!this.client) return null;
    const res = await this.client.query(
      'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *',
      [user.name, user.email, user.role]
    );
    this.allUsers.push(res.rows[0]);
    return res.rows[0];
  }

  async updateUser(id, updatedUser) {
    if (!this.client) return null;
    const res = await this.client.query(
      'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *',
      [updatedUser.name, updatedUser.email, updatedUser.role, id]
    );
    const updated = res.rows[0];
    this.allUsers = this.allUsers.map(u => (u.id === id ? updated : u));
    return updated;
  }

  async deleteUser(id) {
    if (!this.client) return null;
    const res = await this.client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    this.allUsers = this.allUsers.filter(u => u.id !== id);
    return res.rows[0];
  }

  async deleteAllUsers() {
    if (!this.client) return [];
    const res = await this.client.query('DELETE FROM users RETURNING *');
    this.allUsers = [];
    return res.rows;
  }

  async getAdminsOnly() {
    if (this.client) {
      try {
        const res = await this.client.query("SELECT * FROM users WHERE role = 'Admin' OR role = 'admin'");
        this.admins = res.rows;
        console.log('Admins fetched:', this.admins);
        return this.admins;
      } catch (err) {
        console.error('Error executing query', err.stack);
        return [];
      }
    }
  }
  
  async getAdminById(id) {
    if (this.client) {
      try {
        const res = await this.client.query("SELECT * FROM users WHERE id = $1 AND (role = 'Admin' OR role = 'admin')", [id]);
        return res.rows[0] || null;
      } catch (err) {
        console.error('Error executing query', err.stack);
        return null;
      }
    }
  }

  async getUsersOnly() {
    if (!this.client) return [];
    try {
      const res = await this.client.query("SELECT * FROM users WHERE role = 'User'");
      this.users = res.rows;
      console.log("Got all users with user role", this.users);
      return this.users;
    } catch (err) {
      console.error('Error executing query', err.stack);
      return ["PISHOV NAHUY"];
    }
  }

  async getUserById(id) {
    if (!this.client) return null;
    try {
      const res = await this.client.query(
        "SELECT * FROM users WHERE id = $1 AND role = 'User'",
        [id]
      );
      return res.rows[0] || null;
    } catch (err) {
      console.error('Error fetching user by id', err.stack);
      return null;
    }
  }
  async getSuperAdminsOnly() {
    if (this.client) {
    try {
        const res = await this.client.query("SELECT * FROM users WHERE role = 'SuperAdmin' OR role = 'superadmin'");
        this.superadmins = res.rows;
        console.log('SuperAdmins fetched:', this.superadmins);
        return this.superadmins;
    } catch (err) {
        console.error('Error executing query', err.stack);
        return [];
    }
    }
  }

  async getSuperAdminById(id) {
    if (this.client) {
    try {
        const res = await this.client.query("SELECT * FROM users WHERE id = $1 AND (role = 'SuperAdmin' OR role = 'superadmin')", [id]);
        return res.rows[0] || null;
    } catch (err) {
        console.error('Error executing query', err.stack);
        return null;
    }
    }
  }
}

module.exports = Database;