import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosSecure } from "../hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const EditTask = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    fetchTaskData();
  }, [id]);

  const fetchTaskData = async () => {
    try {
      const { data } = await axiosSecure.get(`/task/${id}`);
      setTasks(data);
    } catch (error) {
      setError("fail to fetch Task");
    }
  };
  if (!tasks) {
    return <LoadingSpinner />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const taskName = form.taskName.value;
    const taskDescribtion = form.taskDescribtion.value;
    const assignDate = form.assignDate.value;
    const submissionDeadline = form.submissionDeadline.value;
    const userName = user?.displayName;
    const userEmail = user?.email;

    const editedTask = {
      taskName,
      taskDescribtion,
      assignDate,
      submissionDeadline,
      userName,
      userEmail,
    };

    console.log(editedTask);
    try {
      await axiosSecure.put(
        `${import.meta.env.VITE_API_URL}/editTask/${id}`,
        editedTask
      );
      // Show success toast and navigate after the post is successful
      //   toast.success("Data added successfully");
      Swal.fire({
        title: "Success!",
        text: "Data added successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/myTask");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to add data");
    }
  };
  return (
    <div
      data-aos="zoom-in"
      className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6 lg:pt-10"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Task Name */}
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="taskName"
          >
            Task Name
          </label>
          <input
            id="taskName"
            name="taskName"
            placeholder="Enter Task Name"
            defaultValue={tasks?.taskName}
            className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            type="text"
            required
          />
        </div>

        {/* Task Describtion */}
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="taskDescribtion"
          >
            Task Describtion
          </label>
          <textarea
            id="taskDescribtion"
            name="taskDescribtion"
            placeholder="Provide details about the Task"
            defaultValue={tasks?.taskDescribtion}
            className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Product Image URL */}
        {/* <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="productImageUrl"
          >
            Product Image URL
          </label>
          <input
            id="productImageUrl"
            name="productImageUrl"
            placeholder="Enter product image URL"
            className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            type="url"
            required
          />
        </div> */}

        {/* Assign Date */}
        <div className="flex justify-center items-center gap-5">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="assignDate"
            >
              Assign Date
            </label>
            <input
              id="assignDate"
              name="assignDate"
              defaultValue={tasks?.assignDate}
              className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              type="date"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700 w-full"
              htmlFor="submissionDeadline"
            >
              Submission Deadline
            </label>
            <input
              id="submissionDeadline"
              name="submissionDeadline"
              defaultValue={tasks?.submissionDeadline}
              className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              type="date"
              required
            />
          </div>
        </div>

        {/* Edit Task Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Edit Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
