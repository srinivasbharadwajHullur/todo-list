import React from "react";

const TodoList = ({ todos, handleDelete, handleUpdateTask }) => {
  return (
    <>
      {todos.map((task) => {
        return (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.userId}</td>
            <td
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </td>
            <td>
              <button
                onClick={() => handleDelete(task.id)}
                className="delete-button"
              >
                Delete
              </button>
            </td>
            <td>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleUpdateTask(task.id)}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default TodoList;
