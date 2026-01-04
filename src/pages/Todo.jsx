import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Fetch user
  useEffect(() => {
    axios
      .get("https://todoapp-backend-yw3u.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  // Fetch todos
  useEffect(() => {
    axios
      .get("https://todoapp-backend-yw3u.onrender.com/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const todosWithEditing = res.data.map((todo) => ({
          ...todo,
          isEditing: false,
          editTitle: todo.title,
        }));
        setTodos(todosWithEditing);
      })
      .catch((err) => console.log(err));
  }, [token]);

  // Add todo
  const addTodo = async () => {
    if (!title) return;

    const res = await axios.post(
      "https://todoapp-backend-yw3u.onrender.com/api/todos",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTodos([
      ...todos,
      { ...res.data, isEditing: false, editTitle: res.data.title },
    ]);
    setTitle("");
  };

  // Remove todo
  const removeTodo = async (id) => {
    await axios.delete(
      `https://todoapp-backend-yw3u.onrender.com/api/todos/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTodos(todos.filter((t) => t._id !== id));
  };

  // Enable editing
  const editTodo = (id) => {
    setTodos(todos.map((t) => (t._id === id ? { ...t, isEditing: true } : t)));
  };

  // Save updated todo
  const saveTodo = async (id) => {
    const todoToSave = todos.find((t) => t._id === id);
    if (!todoToSave.editTitle) return;

    const res = await axios.put(
      `https://todoapp-backend-yw3u.onrender.com/api/todos/${id}`,
      { title: todoToSave.editTitle },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTodos(
      todos.map((t) =>
        t._id === id
          ? { ...res.data, isEditing: false, editTitle: res.data.title }
          : t
      )
    );
  };

  // Handle edit input
  const handleEditChange = (id, value) => {
    setTodos(todos.map((t) => (t._id === id ? { ...t, editTitle: value } : t)));
  };

  return (
    <div className="todo-main">
      <div className="todo-header">
        <div className="user-info">
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
        <button className="logout-btn" onClick={logoutHandler}>
          Logout
        </button>
      </div>

      <div className="todo-heading">
        <h2>Todo List</h2>
      </div>

      <div className="todo-input">
        <input
          placeholder="Add todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.map((todo) => (
        <div className="todo-list" key={todo._id}>
          <input
            style={{ border: "none" }}
            value={todo.isEditing ? todo.editTitle : todo.title}
            readOnly={!todo.isEditing}
            onChange={(e) => handleEditChange(todo._id, e.target.value)}
          />
          <button onClick={() => removeTodo(todo._id)}>Remove</button>
          {todo.isEditing ? (
            <button onClick={() => saveTodo(todo._id)}>Save</button>
          ) : (
            <button onClick={() => editTodo(todo._id)}>Edit</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todo;
