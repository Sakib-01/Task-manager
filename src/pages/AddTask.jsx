import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { axiosSecure } from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const taskName = form.taskName.value;
    const taskDescribtion = form.taskDescribtion.value;
    const assignDate = form.assignDate.value;
    const submissionDeadline = form.submissionDeadline.value;
    const userName = user?.displayName;
    const userEmail = user?.email;

    const newTask = {
      taskName,
      taskDescribtion,
      assignDate,
      submissionDeadline,
      userName,
      userEmail,
    };

    console.log(newTask);
    try {
      await axiosSecure.post(`/add-task`, newTask);

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
    <div className="border-t-2 ">
      <div
        data-aos="zoom-in"
        className="max-w-xl mx-auto mt-20 bg-white shadow-md rounded-lg p-6 lg:pt-10"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Task</h2>
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
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <div className="w-full sm:w-auto mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="assignDate"
              >
                Assign Date
              </label>
              <input
                id="assignDate"
                name="assignDate"
                className="block w-full sm:w-60 px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                type="date"
                required
              />
            </div>

            <div className="w-full sm:w-auto mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700 w-full"
                htmlFor="submissionDeadline"
              >
                Submission Deadline
              </label>
              <input
                id="submissionDeadline"
                name="submissionDeadline"
                className="block w-full sm:w-60 px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                type="date"
                required
              />
            </div>
          </div>

          {/* Add Query Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize bg-primary rounded-lg hover:bg-secondary hover:text-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Add Query
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
