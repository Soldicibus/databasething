const Database = require('./database');

class AdminDatabase extends Database {
  constructor(user, password, host, database, port = 5432) {
    super(user, password, host, database, port);
    this.admins = [];
    if (AdminDatabase.instance) {
      return AdminDatabase.instance;
    }
    AdminDatabase.instance = this;
  }

  async getAdminsOnly() {
    if (this.database) {
      try {
        const res = await this.database.query("SELECT * FROM users WHERE role = 'Admin' OR role = 'admin'");
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
    if (this.database) {
      try {
        const res = await this.database.query("SELECT * FROM users WHERE id = $1 AND role = 'Admin' OR role = 'admin'", [id]);
        return res.rows[0] || null;
      } catch (err) {
        console.error('Error executing query', err.stack);
        return null;
      }
    }
  }
}

module.exports = AdminDatabase;