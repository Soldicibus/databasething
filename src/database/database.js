import { Client } from "pg";
import readline from "readline";
import { User, Admin, Moderator, SuperAdmin } from "../users.js";
import { logger } from "../users.js";
import dotenv from "dotenv";
dotenv.config();

function mapRowToEntity(row) {
  if (!row) return null;
  let entity;
  switch (row.role.toLowerCase()) {
    case 'user':
      entity = new User(row.name, row.email, row.password, row.id);
      break;
    case 'admin':
      entity = new Admin(row.name, row.email, row.password, row.id);
      break;
    case 'moderator':
      entity = new Moderator(row.name, row.email, row.password, row.id);
      break;
    case 'superadmin':
      entity = new SuperAdmin(row.name, row.email, row.password, row.id);
      break;
    default:
      entity = new User(row.name, row.email, row.password, row.id);
  }
  entity.role = row.role;
  return entity;
}

export class Database {
  constructor(
    user = process.env.DB_USER,
    password = process.env.DB_PASSWORD,
    host = process.env.DB_HOST,
    dbName = process.env.DB_NAME,
    port = process.env.DB_PORT || 5432,
  ) {
    if (Database.instance) return Database.instance;
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
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      this.client = new Client({
        user: this.user,
        password: this.password,
        host: this.host,
        database: this.dbName,
        port: this.port,
      });
      await this.client.connect();
      logger.logAction("connected to database", { name: "System" });
      await this.client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          password VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          role VARCHAR(50) NOT NULL
        );
      `);
      logger.logAction("CHECKED USERS", { name: "System" });
      
      await this.getAllUsers();
      await this.getAdminsOnly();
      await this.getSuperAdminsOnly();
      if (this.allUsers.length === 0) {
        console.log("INFO: No users found in database.");
        rl.question('Add users? 1-yes 2-no: ', (userInput) => {
          if (userInput.trim() === "1") {
            this.createUser({ name: "admin", email: "admin@email.com", role: "Admin", password: "adminpass" });
            this.createUser({ name: "user", email: "user@user.com", role: "User", password: "userpass" });
            this.createUser({ name: "superadmin", email: "boynextdoor@gmail.cum", role: "SuperAdmin", password: "superpass" });
            logger.logAction("додав початкових користувачів до бази даних", { name: "System" });
            this.getAllUsers();
          }
          if (userInput.trim() === "2") {
            console.log("INFO: No users were added. Proceeding without users.");
          }
          rl.close();
        });
      }
      logger.logAction("connection established", { name: "System" });
      return this.client;
    } catch (err) {
      console.error("WARNING: Database connection error", err.stack);
      return null;
    }
  }

  async getAllUsers() {
    if (!this.client) return [];
    try {
      const res = await this.client.query("SELECT * FROM users");
      this.allUsers = res.rows.map(mapRowToEntity);
      logger.logAction("GET all users", { name: "System" });
      return this.allUsers;
    } catch (err) {
      console.error("Error executing query", err.stack);
      return [];
    }
  }

  async getUserById(id) {
    if (!this.client) return null;
    try {
      const res = await this.client.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      logger.logAction(`GET users with id: ${id}`, { name: "System" });
      return res.rows[0] || null;
    } catch (err) {
      console.error("Error fetching user by id", err.stack);
      return null;
    }
  }

  async createUser(user) {
    if (!this.client) return null;
    const res = await this.client.query(
      "INSERT INTO users (name, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [user.name, user.password, user.email, user.role],
    );
    logger.logAction(`created user: ${user.name}, ${user.password}, ${user.email}, ${user.role}`, { name: "System" }); 
    const entity = mapRowToEntity(res.rows[0]);
    this.allUsers.push(entity);
    return entity;
  }

  async updateUser(id, updatedUser) {
    if (!this.client) return null;
    const res = await this.client.query(
      "UPDATE users SET name = $1, email = $2, role = $3, password = $4 WHERE id = $5 RETURNING *",
      [updatedUser.name, updatedUser.email, updatedUser.role, updatedUser.password, id],
    );
    const updated = mapRowToEntity(res.rows[0]);
    logger.logAction(`updated user with id ${id}`, { name: "System" });
    this.allUsers = this.allUsers.map((u) => (u.id === id ? updated : u));
    return updated;
  }

  async deleteUser(id) {
    if (!this.client) return null;
    const res = await this.client.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id],
    );
    logger.logAction(`deleted user with id ${id}`, { name: "System" });
    this.allUsers = this.allUsers.filter((u) => u.id !== id);
    return res.rows[0];
  }

  async deleteAllUsers() {
    if (!this.client) return [];
    const res = await this.client.query("DELETE FROM users RETURNING *");
    this.allUsers = [];
    logger.logAction("deleted all users", { name: "System" });
    return res.rows;
  }

  async getAdminsOnly() {
    if (this.client) {
      try {
        const res = await this.client.query(
          "SELECT * FROM users WHERE role = 'Admin' OR role = 'admin'",
        );
        this.admins = res.rows;
        logger.logAction("Admins fetched", { name: "System" });
        return this.admins;
      } catch (err) {
        console.error("Error executing query", err.stack);
        return [];
      }
    }
  }

  async getAdminById(id) {
    if (this.client) {
      try {
        const res = await this.client.query(
          "SELECT * FROM users WHERE id = $1 AND (role = 'Admin' OR role = 'admin')",
          [id],
        );
        return res.rows[0] || null;
      } catch (err) {
        console.error("Error executing query", err.stack);
        return null;
      }
    }
  }
  
  async getSuperAdminsOnly() {
    if (this.client) {
      try {
        const res = await this.client.query(
          "SELECT * FROM users WHERE role = 'SuperAdmin' OR role = 'superadmin'",
        );
        this.superadmins = res.rows;
        logger.logAction("SuperAdmins fetched: ", this.superAdmins, { name: "System" });
        return this.superadmins;
      } catch (err) {
        console.error("Error executing query", err.stack);
        return [];
      }
    }
  }

  async getSuperAdminById(id) {
    if (this.client) {
      try {
        const res = await this.client.query(
          "SELECT * FROM users WHERE id = $1 AND (role = 'SuperAdmin' OR role = 'superadmin')",
          [id],
        );
        return res.rows[0] || null;
      } catch (err) {
        console.error("Error executing query", err.stack);
        return null;
      }
    }
  }
}