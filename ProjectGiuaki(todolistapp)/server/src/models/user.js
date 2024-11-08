const db = require("../config/database");

const User = {
  getAll: (callback) => {
    db.query("SELECT * FROM users", callback);
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  },
  create: (name, email, password, callback) => {
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      callback
    );
  },
  update: (id, name, email, password, callback) => {
    db.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, password, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("DELETE FROM users WHERE id = ?", [id], callback);
  },
};

module.exports = User;
