import React, { useState, useEffect } from "react";
import { Form, Input, Button, List, message } from "antd";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post("http://localhost:3000/api/users", {
        name,
        email,
        phone,
      });
      message.success("Thêm người dùng thành công!");
      setName("");
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:3000/api/users/${editingUser.id}`, {
        name,
        email,
        phone,
      });
      message.success("Cập nhật người dùng thành công!");
      setEditingUser(null);
      setName("");
      setEmail("");
      setPhone("");
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      message.success("Xóa người dùng thành công!");
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  const startEditing = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Quản Lý Người Dùng</h1>
      <Form layout="vertical" onFinish={editingUser ? updateUser : addUser}>
        <Form.Item label="Tên người dùng" required>
          <Input
            placeholder="Tên người dùng"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingUser ? "Cập Nhật" : "Thêm Người Dùng"}
          </Button>
        </Form.Item>
      </Form>

      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => startEditing(user)}>
                Sửa
              </Button>,
              <Button type="link" danger onClick={() => deleteUser(user.id)}>
                Xóa
              </Button>,
            ]}
          >
            <List.Item.Meta title={user.name} description={`${user.email}`} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserManagement;
