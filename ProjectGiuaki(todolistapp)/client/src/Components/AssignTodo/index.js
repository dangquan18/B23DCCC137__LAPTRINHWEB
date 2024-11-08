// AssignTodo.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./assigntodo.css";
import { useNavigate } from "react-router-dom";
const AssignTodo = () => {
  const [users, setUsers] = useState([]); // Danh sách người dùng
  const [todos, setTodos] = useState([]); // Danh sách công việc
  const [selectedUser, setSelectedUser] = useState(""); // Người dùng được chọn
  const [selectedTodo, setSelectedTodo] = useState(""); // Công việc được chọn

  // Hàm tải danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
      alert("Không thể tải danh sách người dùng.");
    }
  };

  // Hàm tải danh sách công việc từ API
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách công việc:", error);
      alert("Không thể tải danh sách công việc.");
    }
  };

  // Hàm phân công công việc cho người dùng
  const navigate = useNavigate();

  const assignTask = async () => {
    if (!selectedUser || !selectedTodo) {
      alert("Vui lòng chọn người dùng và công việc.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/assign", {
        userId: selectedUser,
        todoId: selectedTodo,
      });
      alert("Công việc đã được phân công thành công!");
      navigate("/assignlist");
    } catch (error) {
      console.error("Lỗi khi phân công công việc:", error);
      alert("Không thể phân công công việc.");
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchUsers();
    fetchTodos();
  }, []);

  return (
    <div className="assigntodo">
      <h1>Phân Công Công Việc</h1>
      <div>
        <label>Chọn Người Dùng:</label>
        <select
          className="select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Chọn người dùng</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Chọn Công Việc:</label>
        <select
          value={selectedTodo}
          className="select"
          onChange={(e) => setSelectedTodo(e.target.value)}
        >
          <option value="">Chọn công việc</option>
          {todos.map((todo) => (
            <option key={todo.id} value={todo.id}>
              {todo.title}
            </option>
          ))}
        </select>
      </div>
      <button onClick={assignTask}>Phân Công</button>
    </div>
  );
};

export default AssignTodo;
