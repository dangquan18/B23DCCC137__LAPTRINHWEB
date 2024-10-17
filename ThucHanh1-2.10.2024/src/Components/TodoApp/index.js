import { useState } from "react";
import "./style.css";
import { PlusCircleOutlined } from "@ant-design/icons";

function TodoApp() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      name: "Học lập trình web với React",
      description: "Tomorrow  ",
    },
    {
      id: 2,
      name: "Gửi email nộp bài tập về nhà ",
      description: "Saturday",
    },
    {
      id: 3,
      name: "Học từ vựng tiếng anh mỗi ngày",
      description: "Monday",
    },
    {
      id: 4,
      name: "Viết tiểu luận môn triết học ",
      description: "Today",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.inputTodo.value;
    if (value) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: prevTodos.length + 1, name: value },
      ]);
    }
  };

  return (
    <>
      <div className="ToDoItem">
        <div>My work 🎯</div>
        {todos.map((item) => (
          <div key={item.id}>
            <input type="checkbox" />
            <div className="Title">{item.name}</div>
            <p className="DueDate">{item.description}</p>
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <input name="inputTodo" />
          <button style={{ marginTop: "5px" }}>
            <PlusCircleOutlined
              style={{ fontSize: "20px", color: "#d1453b" }}
            />{" "}
            Add Task
          </button>
        </form>
      </div>
    </>
  );
}

export default TodoApp;
