import React from "react";

const TaskItem = ({ task, onDelete, onToggle }: any) => {
  return (
    <li className="flex items-center justify-between border-b py-2">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${
            task.completed ? "line-through text-green-500" : "text-black"
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
