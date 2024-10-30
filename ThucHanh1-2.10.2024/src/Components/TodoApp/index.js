import { useState } from "react";
import "./style.css";
import { PlusCircleOutlined } from "@ant-design/icons";

function TodoApp() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      name: "Học lập trình web với React",
      description: "Tomorrow",
      done: false,
    },
    {
      id: 2,
      name: "Gửi email nộp bài tập về nhà",
      description: "Saturday",
      done: false,
    },
    {
      id: 3,
      name: "Học từ vựng tiếng anh mỗi ngày",
      description: "Monday",
      done: false,
    },
    {
      id: 4,
      name: "Viết tiểu luận môn triết học",
      description: "Today",
      done: false,
    },
  ]);

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.inputTodo.value;
    if (value) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: prevTodos.length + 1, name: value, description: "", done: false },
      ]);
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setEditValue(name);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, name: editValue } : todo
      )
    );
    setEditId(null);
    setEditValue("");
  };

  const handleDone = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, done: true } : todo))
    );
  };

  return (
    <>
      <div className="ToDoItem">
        <div>My work 🎯</div>
        {todos.map((item) => (
          <div key={item.id} className={item.done ? "done" : ""}>
            <input type="hidden" />
            {editId === item.id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <div className="Title">{item.name}</div>
                <p className="DueDate">{item.description}</p>
                {!item.done && (
                  <>
                    <button onClick={() => handleEdit(item.id, item.name)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleDone(item.id)}>Done</button>
                  </>
                )}
              </>
            )}
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
