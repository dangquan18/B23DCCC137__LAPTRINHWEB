const User = require("../models/user");

const userController = {
  getAllUsers: (req, res) => {
    User.getAll((err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Lỗi khi lấy danh sách người dùng" });
      }
      res.json(results);
    });
  },
  getUserById: (req, res) => {
    const { id } = req.params;
    User.getById(id, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Lỗi khi lấy thông tin người dùng" });
      }
      res.json(results);
    });
  },
  createUser: (req, res) => {
    const { name, email, password } = req.body;
    User.create(name, email, password, (err) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi tạo người dùng" });
      }
      res.status(201).json({ message: "Người dùng đã được tạo" });
    });
  },
  updateUser: (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    User.update(id, name, email, password, (err) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi cập nhật người dùng" });
      }
      res.json({ message: "Người dùng đã được cập nhật" });
    });
  },
  deleteUser: (req, res) => {
    const { id } = req.params;
    User.delete(id, (err) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi xóa người dùng" });
      }
      res.json({ message: "Người dùng đã được xóa" });
    });
  },
};

module.exports = userController;
