const db = require("../config/database");

const Assign = {
  getAll: (callback) => {
    const query = `
      SELECT a.id, u.name AS userName, t.title AS todoTitle, a.assignedAt
      FROM assign AS a
      JOIN users AS u ON a.userId = u.id
      JOIN todos AS t ON a.todoId = t.id
    `;
    db.query(query, callback);
  },

  create: (userId, todoId, callback) => {
    const query = "INSERT INTO assign (userId, todoId) VALUES (?, ?)";
    db.query(query, [userId, todoId], callback);
  },
};

module.exports = Assign;
