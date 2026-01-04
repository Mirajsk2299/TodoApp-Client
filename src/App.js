import "./App.css";
import Login from "../src/pages/Login.jsx";
import Register from "../src/pages/Register.jsx";
import Todo from "../src/pages/Todo.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Login />
      <Register />
      <Todo /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
