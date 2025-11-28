const Database = require('./database');

class SuperAdminDatabase extends Database {
    constructor(user, password, host, database, port = 5432) {
        super(user, password, host, database, port);
        this.superadmins = [];
        if (SuperAdminDatabase.instance) {
            return SuperAdminDatabase.instance;
        }
        SuperAdminDatabase.instance = this;
    }

    async getSuperAdminsOnly() {
        if (this.database) {
            try {
                const res = await this.database.query("SELECT * FROM users WHERE role = 'SuperAdmin' OR role = 'superadmin'");
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
        if (this.database) {
            try {
                const res = await this.database.query("SELECT * FROM users WHERE id = $1 AND role = 'SuperAdmin' OR role = 'superadmin'", [id]);
                return res.rows[0] || null;
            } catch (err) {
                console.error('Error executing query', err.stack);
                return null;
            }
        }
    }
}

module.exports = SuperAdminDatabase;