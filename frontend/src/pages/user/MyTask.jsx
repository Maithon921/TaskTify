import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import TaskCard from "../../components/TaskCard";
import dayjs from "dayjs";
import DashboardLayout from "../../components/DashboardLayout";

const MyTask = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [dueFilter, setDueFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/task/");
      if (response.data) {
        setAllTasks(response.data);
      }
    } catch (err) {
      console.error("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleClick = (taskId) => {
    navigate(`/user/tasksdetail/${taskId}`);
  };

  const isOverdue = (task) => {
    return (
      task.status !== "completed" &&
      dayjs(task.dueDate).isBefore(dayjs(), "day")
    );
  };

  const isToday = (date) => {
    return dayjs(date).isSame(dayjs(), "day");
  };

  const isUpcoming = (date) => {
    return dayjs(date).isAfter(dayjs(), "day");
  };

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
      task.priority === priorityFilter.toLowerCase();

    const matchesDue =
      dueFilter === "All" ||
      (dueFilter === "Today" && isToday(task.dueDate)) ||
      (dueFilter === "Upcoming" && isUpcoming(task.dueDate)) ||
      (dueFilter === "Overdue" && isOverdue(task));

    return matchesSearch && matchesStatus && matchesPriority && matchesDue;
  });

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="my-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl md:text-3xl font-medium text-primary">
            My Tasks
          </h2>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm w-full md:w-64"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 ">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2 py-1 border rounded-md text-sm w-20"
            >
              {["All", "Pending", "Completed", "Overdue"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 ">
              Priority
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-2 py-1 border rounded-md text-sm w-20"
            >
              {["All", "Low", "Medium", "High"].map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Due</label>
            <select
              value={dueFilter}
              onChange={(e) => setDueFilter(e.target.value)}
              className="px-2 py-1 border rounded-md text-sm w-20"
            >
              {["All", "Today", "Upcoming", "Overdue"].map((due) => (
                <option key={due} value={due}>
                  {due}
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
            {filteredTasks.map((item) => (
              <TaskCard
                key={item._id}
                id={item._id}
                isOverdue={isOverdue(item)}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo?.map((user) => user.username)}
                onClick={() => handleClick(item._id)}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyTask;
