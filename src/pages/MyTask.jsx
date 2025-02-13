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
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      fetchTaskData();
    }
  }, [user?.email]);

  useEffect(() => {
    document.title = "Task Management - MyTasks";
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const fetchTaskData = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get(`/my-task/${user?.email}`);
      const sortedData = data.sort(
        (a, b) => new Date(b.assignDate) - new Date(a.assignDate)
      );
      setTasks(sortedData);
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
        fetchTaskData();
        Swal.fire("Deleted!", "Your task has been removed.", "success");
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to delete the task.", "error");
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-8">
        Your Created Tasks
      </h2>

      {loading && (
        <p className="text-center text-gray-500">Loading your Tasks...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && tasks?.length === 0 && (
        <p className="text-center text-gray-500">
          No tasks found.{" "}
          <Link to="/addTask">
            <button className="btn btn-primary ml-2">Add Task</button>
          </Link>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks?.map((task) => (
          <div
            key={task._id}
            data-aos="fade-up"
            className="bg-white text-left shadow-md rounded-lg overflow-hidden transition transform hover:scale-105 h-72 "
          >
            <div className="p-4 ">
              <h3 className="text-xl font-semibold">{task.taskName}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {task.taskDescribtion}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                <strong>Assigned:</strong> {task.assignDate}
              </p>
              <p className="text-sm text-gray-500">
                <strong className="text-red-600">Deadline:</strong>{" "}
                {task.submissionDeadline}
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
            </div>
            <div className="flex justify-around items-center px-4 pb-4 ">
              <Link
                to={`/taskDetails/${task._id}`}
                className="btn btn-primary btn-sm"
              >
                View
              </Link>
              <Link
                to={`/updateTask/${task._id}`}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTask;
