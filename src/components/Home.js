import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./TodoList";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");

  const fetchTodoList = async () => {
    setLoading(true);

    try {
      // Check local storage for existing todos
      const getLocalStorageTodos =
        JSON.parse(localStorage.getItem("todos")) || [];

      // Settings the todos of local storage if it has data
      if (getLocalStorageTodos.length > 0) {
        setTodos(getLocalStorageTodos);
        setLoading(false);
        return;
      }

      // Make API call only if local storage is empty
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);

      // Update local storage with the API data
      localStorage.setItem("todos", JSON.stringify(response.data));

      setLoading(false);
    } catch (error) {
      setError("Can't able to fetch the data" + error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const setItemsToLocalStorage = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  if (loading) {
    return <div>Loading..</div>;
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      setItemsToLocalStorage(updatedTodos);
    } catch (error) {
      setError("Cant able to delete the item" + error);
    }
  };

  const handleUpdateTask = async (id) => {
    try {
      await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: true,
      });

      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      setItemsToLocalStorage(todos);
    } catch (error) {
      setError("Can't update the task" + error);
    }
  };

  const handleAddTask = () => {
    const newTask = {
      userId: 1,
      title: title,
      completed: false,
    };
    setTodos((todos) => [newTask, ...todos]);
    setItemsToLocalStorage([newTask, ...todos]);
    setTitle("");
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className="logo">TodoList</h1>
      </nav>
      <div className="home-page">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ marginBottom: "10px" }} className="add-task-container">
          <input
            type="text"
            placeholder="Enter the task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
              width: "200px",
            }}
          />
          <button
            onClick={handleAddTask}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #007BFF",
              backgroundColor: "#007BFF",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Add Task
          </button>
        </div>

        <table className="todo-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>UserId</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <TodoList
              todos={todos}
              handleDelete={handleDelete}
              handleUpdateTask={handleUpdateTask}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
