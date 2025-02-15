import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ViewTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init(); // Initialize AOS
    fetchTaskData();
  }, [id]);

  const fetchTaskData = async () => {
    try {
      const { data } = await axiosSecure.get(`/task/${id}`);
      setTask(data);
    } catch (error) {
      setError("Failed to fetch task. Please try again later.");
    }
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!task) {
    return (
      <p className="text-center text-primary pt-20 ">Loading task details...</p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div
        className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full"
        data-aos="fade-up" // AOS animation applied
        data-aos-duration="800"
      >
        <h2 className="text-2xl font-bold text-center mb-4">{task.taskName}</h2>
        <p className="text-gray-700">
          <strong>Description:</strong> {task.taskDescribtion}
        </p>
        <p className="text-gray-700">
          <strong>Assigned On:</strong> {task.assignDate}
        </p>
        <p className=" text-red-500">
          <strong>Deadline:</strong> {task.submissionDeadline}
        </p>
        <p
          className={`mt-2 text-sm font-semibold ${
            task.status === "pending" ? "text-yellow-500" : "text-green-600"
          }`}
        >
          <strong>Status:</strong> {task.status}
        </p>

        <div className="flex justify-between mt-6">
          <button onClick={() => navigate(-1)} className="btn btn-accent">
            Go Back
          </button>
          {task.status === "pending" && (
            <button
              onClick={async () => {
                try {
                  await axiosSecure.patch(`/updateTask/${id}`, {
                    status: "completed",
                  });
                  setTask({ ...task, status: "completed" });
                  Swal.fire("Success!", "Task marked as completed.", "success");
                } catch {
                  Swal.fire("Error!", "Failed to update task status.", "error");
                }
              }}
              className="btn bg-primary text-white"
            >
              Mark as Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
