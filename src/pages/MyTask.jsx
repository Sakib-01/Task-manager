import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const MyTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      fetchTaskData();
    }
  }, [user?.email]);

  useEffect(() => {
    document.title = "Task Management - MyTasks";
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const fetchTaskData = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get(`/my-task/${user?.email}`);
      setTasks(
        data.sort(
          (a, b) =>
            new Date(a.submissionDeadline) - new Date(b.submissionDeadline)
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This task will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/deleteTask/${id}`);
        setTasks(tasks.filter((task) => task._id !== id));
        Swal.fire("Deleted!", "Your task has been removed.", "success");
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to delete the task.", "error");
    }
  };

  const handleComplete = async (id) => {
    try {
      await axiosSecure.patch(`/updateTask/${id}`, { status: "completed" });
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, status: "completed" } : task
        )
      );
      Swal.fire("Success!", "Task marked as completed.", "success");
    } catch (err) {
      Swal.fire("Error!", "Failed to update task status.", "error");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filter === "all" || task.status === filter) &&
      (task.taskName.toLowerCase().includes(search.toLowerCase()) ||
        task.taskDescribtion.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="bg-background min-h-screen py-10">
      <div className="container mx-auto px-4 p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          Your Created Tasks
        </h2>
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            className="input input-bordered w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="select select-bordered w-full max-w-xs"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {loading && (
          <p className="text-center text-gray-200">Loading your Tasks...</p>
        )}
        {error && <p className="text-center text-red-300">{error}</p>}
        {!loading && filteredTasks.length === 0 && (
          <p className="text-center text-gray-200">
            No tasks found.{" "}
            <Link to="/addTask">
              <button className="btn btn-primary ml-2">Add Task</button>
            </Link>
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              data-aos="fade-up"
              className="bg-white shadow-md rounded-lg p-4"
            >
              <h3 className="text-xl font-semibold">{task.taskName}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {task.taskDescribtion}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Assigned:</strong> {task.assignDate}
              </p>
              <p className="text-sm text-red-600">
                <strong>Deadline:</strong> {task.submissionDeadline}
              </p>
              <p
                className={`mt-2 text-sm font-semibold ${
                  task.status === "pending"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                Status: {task.status}
              </p>
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/taskDetails/${task._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View
                </Link>
                <Link
                  to={`/editTask/${task._id}`}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
                {task.status === "pending" && (
                  <button
                    onClick={() => handleComplete(task._id)}
                    className="btn btn-success btn-sm"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTask;
