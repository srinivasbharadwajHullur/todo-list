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
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      setError("Cant able to fetch the data" + error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTodoList();
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  }

  const handleDelete = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const deleteTodos = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTodos);
  };

  const handleUpdateTask = async (id) => {
    await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true,
    });
    //Need to update the state when we do patch operation
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddTask = async () => {
    const newTask = {
      userId: 1,
      title: title,
      completed: false,
    };
    // Update the local state to include the new task
    setTodos((prevTodos) => [newTask, ...prevTodos]);
    setTitle("")
  };

  return (
    <div className="home-page">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Enter the task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
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
  );
};

export default Home;
