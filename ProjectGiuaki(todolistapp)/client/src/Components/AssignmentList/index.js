import React, { useState, useEffect } from "react";
import axios from "axios";
import "./assignlist.css";
const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/assignments");
      setAssignments(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phân công:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="assignlist">
      <h1>Danh Sách Phân Công</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Người Dùng</th>
            <th>Công Việc</th>
            <th>Ngày Phân Công</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.id}</td>
              <td>{assignment.userName}</td>
              <td>{assignment.todoTitle}</td>
              <td>{new Date(assignment.assignedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentList;
