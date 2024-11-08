import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import TodoApp from "./Components/CreateTodo"; // Giả sử bạn có TodoApp
import AssignTodo from "./Components/AssignTodo";
import "./App.css";
import AssignmentList from "./Components/AssignmentList";
import UserManagement from "./Components/UserManagement";
const App = () => {
  return (
    <Router>
      <nav className="Todo">
        <NavLink to="/">Todo List</NavLink>
        <NavLink to="/assign">Phân Công</NavLink>
        <NavLink to="/user">Danh Sách Người Dùng</NavLink>
        <NavLink to="assignlist">Danh sách phân công</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<TodoApp />} />
        <Route path="/assign" element={<AssignTodo />} />
        <Route path="/assignlist" element={<AssignmentList />} />
        <Route path="/user" element={<UserManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
