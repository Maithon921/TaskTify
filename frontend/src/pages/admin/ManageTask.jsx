import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import TaskCard from "../../components/TaskCard";
import dayjs from "dayjs";
import DashboardLayout from "../../components/DashboardLayout";

const ManageTask = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [dueFilter, setDueFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const getAllTasks = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/task/");
        if (res.data) setAllTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setLoading(false);
      }
    };
    getAllTasks();
  }, []);

  const handleClick = (task) => {
    navigate("/admin/tasks", { state: { taskId: task._id } });
  };

  const isOverdue = (task) =>
    task.status !== "completed" && dayjs(task.dueDate).isBefore(dayjs(), "day");

  const isDueToday = (task) => dayjs(task.dueDate).isSame(dayjs(), "day");

  const isUpcoming = (task) => dayjs(task.dueDate).isAfter(dayjs(), "day");

  const handleStatusChange = (taskId, newStatus) => {
    setAllTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Overdue" && isOverdue(task)) ||
      task.status === statusFilter.toLowerCase();

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority.toLowerCase() === priorityFilter.toLowerCase();

    const matchesDue =
      dueFilter === "All" ||
      (dueFilter === "Overdue" && isOverdue(task)) ||
      (dueFilter === "Due Today" && isDueToday(task)) ||
      (dueFilter === "Upcoming" && isUpcoming(task));

    return matchesSearch && matchesStatus && matchesPriority && matchesDue;
  });

  const statusOptions = ["All", "Pending", "Completed", "Overdue"];
  const priorityOptions = ["All", "High", "Medium", "Low"];
  const dueOptions = ["All", "Due Today", "Overdue", "Upcoming"];

  return (
    <DashboardLayout>
      <div className="my-5">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h2 className="text-xl md:text-3xl font-medium text-primary">
            Manage Tasks
          </h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or description"
            className="px-3 py-2 border border-gray-200 rounded-md text-sm w-72"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {/* Status Filter */}
          <div className="flex flex-col text-sm">
            <label
              htmlFor="statusFilter"
              className="mb-1 text-gray-600 font-medium"
            >
              Status
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 px-2 py-1 rounded-md w-20"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex flex-col text-sm">
            <label
              htmlFor="priorityFilter"
              className="mb-1 text-gray-600 font-medium"
            >
              Priority
            </label>
            <select
              id="priorityFilter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-200 px-2 py-1 rounded-md w-20"
            >
              {priorityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date Filter */}
          <div className="flex flex-col text-sm">
            <label
              htmlFor="dueFilter"
              className="mb-1 text-gray-600 font-medium"
            >
              Due Date
            </label>
            <select
              id="dueFilter"
              value={dueFilter}
              onChange={(e) => setDueFilter(e.target.value)}
              className="border border-gray-200 px-2 py-1 rounded-md w-20"
            >
              {dueOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-secondary py-8">
            Loading tasks...
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center text-secondary py-8">No tasks found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                id={task._id}
                isOverdue={isOverdue(task)}
                title={task.title}
                description={task.description}
                priority={task.priority}
                status={task.status}
                createdAt={task.createdAt}
                dueDate={task.dueDate}
                assignedTo={task.assignedTo?.map((user) => user.username)}
                onClick={() => handleClick(task)}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageTask;
