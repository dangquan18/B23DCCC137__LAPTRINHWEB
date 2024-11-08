const Assign = require("../models/assign");

const assignController = {
  getAllAssignments: (req, res) => {
    Assign.getAll((err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Lỗi khi lấy danh sách phân công" });
      }
      res.json(results);
    });
  },

  createAssignment: (req, res) => {
    const { userId, todoId } = req.body;
    Assign.create(userId, todoId, (err) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi phân công công việc" });
      }
      res.status(201).json({ message: "Công việc đã được phân công" });
    });
  },
};

module.exports = assignController;
