import { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Button, Input, Form, Modal, DatePicker, message } from "antd";
import moment from "moment";

const { TextArea } = Input;

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchTodos = () => {
    axios
      .get("http://localhost:3000/api/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = (values) => {
    const { title, description, due_date } = values;
    const completed = false;

    if (title) {
      axios
        .post("http://localhost:3000/api/todos", {
          title: title,
          description: description,
          due_date: due_date,
          completed: completed,
        })
        .then((response) => {
          fetchTodos();
          setModalVisible(false);
          message.success("Task added successfully!");
        })
        .catch((error) => {
          console.error("Lỗi khi thêm công việc:", error);
          message.error("Failed to add task.");
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/todos/${id}`)
      .then(() => {
        fetchTodos();
        message.success("Task deleted successfully!");
      })
      .catch((error) => {
        console.error("Lỗi khi xóa công việc:", error);
        message.error("Failed to delete task.");
      });
  };

  const handleEdit = (id, title, description, due_date) => {
    setEditId(id);
    setEditValue(title);
    setEditDescription(description);
    setEditDueDate(due_date);
    setModalVisible(true);
  };

  const handleEditSubmit = (values) => {
    const { title, description, due_date } = values;
    const todoToUpdate = todos.find((todo) => todo.id === editId);

    if (todoToUpdate) {
      axios
        .put(`http://localhost:3000/api/todos/${editId}`, {
          title: title,
          description: description,
          due_date: due_date,
          completed: todoToUpdate.completed,
        })
        .then(() => {
          fetchTodos();
          setModalVisible(false);
          setEditId(null);
          setEditValue("");
          setEditDescription("");
          setEditDueDate("");
          message.success("Task updated successfully!");
        })
        .catch((error) => {
          console.error("Lỗi khi chỉnh sửa công việc:", error);
          message.error("Failed to update task.");
        });
    }
  };

  const handleDone = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    axios
      .put(`http://localhost:3000/api/todos/${id}`, {
        completed: true,
        title: todoToUpdate.title,
        description: todoToUpdate.description,
        due_date: todoToUpdate.due_date,
      })
      .then(() => {
        fetchTodos();
        message.success("Task marked as done!");
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật công việc:", error);
        message.error("Failed to mark task as done.");
      });
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <>
      <div className="ToDoItem">
        <div>Create work 🎯</div>

        {todos.map((item) => (
          <div key={item.id}>
            <div className="Title">{item.title}</div>
            <p className="Description">{item.description}</p>
            <p className="DueDate">{formatDate(item.due_date)}</p>
            {!item.completed ? (
              <>
                <Button
                  icon={<EditOutlined />}
                  onClick={() =>
                    handleEdit(
                      item.id,
                      item.title,
                      item.description,
                      item.due_date
                    )
                  }
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </Button>
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(item.id)}
                  danger
                  style={{ marginRight: "10px" }}
                >
                  Delete
                </Button>
                <Button
                  icon={<CheckOutlined />}
                  onClick={() => handleDone(item.id)}
                  type="primary"
                >
                  Done
                </Button>
              </>
            ) : (
              <>
                <CheckOutlined style={{ color: "green" }} />
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(item.id)}
                  danger
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        ))}

        <Button
          icon={<PlusCircleOutlined />}
          type="primary"
          onClick={() => setModalVisible(true)}
          style={{ marginTop: "10px" }}
        >
          Add Task
        </Button>

        {/* Modal Add/Edit Task */}
        <Modal
          title={editId ? "Edit Task" : "Add Task"}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={400}
        >
          <Form
            onFinish={editId ? handleEditSubmit : handleSubmit}
            initialValues={{
              title: editValue,
              description: editDescription,
              due_date: editDueDate ? moment(editDueDate) : null,
            }}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                { required: true, message: "Please enter the task title!" },
              ]}
            >
              <Input placeholder="Enter task title" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea placeholder="Enter task description" />
            </Form.Item>
            <Form.Item
              name="due_date"
              label="Due Date"
              rules={[{ required: true, message: "Please select a due date!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {editId ? "Save Changes" : "Add Task"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default TodoApp;
