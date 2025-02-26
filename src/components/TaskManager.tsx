import React, { useState, useEffect } from "react";

import TaskItem from "./TaskItem";
import ITaskItem from "../types/ITaskItem";

const TaskManager = () => {
  // Load initial tasks from localStorage or give it default values
  const [tasks, setTasks] = useState<ITaskItem[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, title: "Buy groceries", completed: false },
      { id: 2, title: "Clean the house", completed: true },
    ];
  });
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState<string>("Task Name");

  // Sync tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Intentional bug: The filter conditions are reversed.
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask!.trim() === "") return;
    const newTaskObj: ITaskItem = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const handleDeleteTask = (id: number) => {
    // Create a new array that excludes the task with the specified id
    const newTasks = tasks.filter((task) => task.id !== id);
    // Update the state with the new array
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        // Create a new object for the task with toggled completion status
        return { ...task, completed: !task.completed };
      }
      // Return the task unchanged if it doesn't match the id
      return task;
    });

    // Update the state with the new array
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto bg-white p-4 rounded shadow">
      <form onSubmit={handleAddTask} className="mb-4 flex">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border rounded-l py-2 px-3"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
          Add
        </button>
      </form>
      <div className="flex justify-around mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
        >
          Pending
        </button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onToggle={toggleTaskCompletion}
          />
        ))}
      </ul>
    </div>
);
};

export default TaskManager;
