import React from "react";
import useFetchTodoList from "../utils/useFetchTodoList";

const Home = () => {
  const { loading, error, todos } = useFetchTodoList();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <table className="todo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserId</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.userId}</td>
                <td>{task.title}</td>
                <td>{`${task.completed}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
