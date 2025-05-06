import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectDropDown from "../../components/SelectDropDown.jsx";
import toast from "react-hot-toast";
import SelectUsers from "../../components/SelectUsers.jsx";
import moment from "moment";
import Modal from "../../components/Modal.jsx";
import DeletingAlert from "../../components/DeletingAlert.jsx";
import DashboardLayout from "../../components/DashboardLayout.jsx";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const options = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    assignedTo: [],
  });

  const [currentTask, setCurrentTask] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [deleteAlert, setDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
      assignedTo: [],
    });
  };

  const createTask = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/task/", {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
      });
      toast.success("Task created successfully");
      navigate("/admin/manage-task");
      clearData();
    } catch (err) {
      console.error("Error creating task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const updateTask = async () => {
    try {
      const response = await axiosInstance.put(`/task/${taskId}`, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
      });
      toast.success("Task updated Succesfully");
      navigate("/admin/manage-task");
    } catch (err) {
      console.err("Error creating task:", err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    setError(null);
    // input validation
    if (!taskData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Description is required");
      return;
    }
    if (!taskData.dueDate) {
      setError("Due date is required");
      return;
    }
    if (taskData.assignedTo?.length === 0) {
      setError("Task not assigned to any member");
      return;
    }
    if (taskId) {
      updateTask();
      return;
    }

    createTask();
  };

  const getTaskById = async () => {
    try {
      const response = await axiosInstance.get(`/task/${taskId}`);
      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);
        setTaskData((prev) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
        }));
      }
    } catch (err) {
      console.error("Error fetching task", err);
    }
  };

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(`/task/${taskId}`);
      setDeleteAlert(false);
      navigate("/admin/manage-task");
      toast.success("Task deleted succesfully");
    } catch (error) {
      console.error(
        "Error deleting task",
        error.response?.data?.messsage || error.messsage
      );
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskById(taskId);
    }
    return () => {};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-4 ">
        <div className="form-card col-span-3">
          <div className=" flex items-center justify-between">
            <h2 className="text-xl font-medium">
              {taskId ? "Update Task" : "Create Task"}
            </h2>
            {taskId && (
              <button
                className="flex items-center gap-1.5 text-[13px] font-medium text-red-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                onClick={() => setDeleteAlert(true)}
              >
                <DeleteIcon className="text-base" /> Delete
              </button>
            )}
          </div>
          <div className="mt-4">
            <label className="text-xs font-medium text-text-secondary">
              Task Title
            </label>
            <input
              placeholder="Create app UI"
              className="form-input"
              value={taskData.title}
              onChange={({ target }) =>
                handleValueChange("title", target.value)
              }
            />
          </div>
          <div className="mt-3">
            <label className="text-xs font-medium text-text-secondary">
              Description
            </label>
            <textarea
              placeholder="Describe task"
              rows={4}
              value={taskData.description}
              onChange={({ target }) =>
                handleValueChange("description", target.value)
              }
              className="form-input"
            ></textarea>
          </div>

          <div className="grid grid-cols-12 gap-4 mt-2">
            <div className="col-span-6 md:col-span-4">
              <label className="text-xs font-medium text-text-secondary">
                Priority
              </label>
              <SelectDropDown
                options={options}
                value={taskData.priority}
                onChange={(value) => handleValueChange("priority", value)}
                placeholder="Select Priority"
              />
            </div>

            <div className="col-span-6 md:col-span-4">
              <label className="text-xs font-medium text-text-secondary">
                Due Date
              </label>
              <input
                className="form-input"
                value={taskData.dueDate}
                onChange={({ target }) =>
                  handleValueChange("dueDate", target.value)
                }
                type="date"
              />
            </div>
            <div className="col-span-12 md:col-span-3">
              <label className="text-xs font-medium text-slate-600">
                Assign To
              </label>
              <SelectUsers
                selectedUsers={taskData.assignedTo}
                setSelectedUsers={(value) =>
                  handleValueChange("assignedTo", value)
                }
                placeholder="low"
              />
            </div>
          </div>
          {error && (
            <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
          )}
          <div className="flex justify-end mt-7">
            <button
              className="add-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {taskId ? "UPDATE TASK" : "CREATE TASK"}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={deleteAlert}
        onClose={() => setDeleteAlert(false)}
        title="Delete Task"
      >
        <DeletingAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;
