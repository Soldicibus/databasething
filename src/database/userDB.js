const Database = require('./database');

class UserDatabase extends Database {
  constructor(user, password, host, database, port = 5432) {
    super(user, password, host, database, port);
    this.users = [];
    if (UserDatabase.instance) {
      return UserDatabase.instance;
    }
    UserDatabase.instance = this;
  }

  async getUsersOnly() {
    if (this.database) {
      try {
        const res = await this.database.query("SELECT * FROM users WHERE role = 'User' OR role = 'user'");
        this.users = res.rows;
        console.log('Users fetched:', this.users);
        return this.users;
      }
        catch (err) {
        console.error('Error executing query', err.stack);
        return [];
      }
    }
  }

  async getUserById(id) {
    if (this.database) {
      try {
        const res = await this.database.query("SELECT * FROM users WHERE id = $1 AND role = 'User' OR role = 'user'", [id]);
        return res.rows[0] || null;
      } catch (err) {
        console.error('Error executing query', err.stack);
        return null;
      }
    }
  }
}

module.exports = UserDatabase;