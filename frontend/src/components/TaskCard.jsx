import moment from "moment";
import AvatarGroup from "./AvatarGroup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import axiosInstance from "../utils/axiosInstance.js";
import { toast } from "react-hot-toast";

function TaskCard({
  id,
  title,
  description,
  priority,
  status,
  createdAt,
  dueDate,
  assignedTo,
  isOverdue,
  onClick,
  onStatusChange, 
}) {
  const getStatusTagColor = () => {
    switch (status) {
      case "completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/10";
      case "pending":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "low":
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/10";
      case "medium":
        return "text-amber-500 bg-amber-50 border border-amber-500/10";
      default:
        return "text-rose-500 bg-rose-50 border border-rose-500/10";
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await axiosInstance.put(`/task/status/${id}`);
      toast.success("Task marked as completed");
      onStatusChange(id, response.data.updatedStatus.status); // ✅ update parent
    } catch (err) {
      toast.error("Failed to mark task");
      console.error("Failed to update status", err);
    }
  };

  const overdueTag = isOverdue && status !== "completed" && (
    <div className="text-[11px] font-medium text-red-500 bg-red-50 border border-red-500/10 px-4 py-0.5 rounded">
      Overdue
    </div>
  );

  return (
    <div
      className="bg-card rounded-xl p-4 shadow-sm border border-gray-200/60 hover:shadow-md transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-wrap gap-2 items-center justify-between mb-3">
        <div className="flex gap-2 flex-wrap">
          {status !== "completed" && (
            <div
              className={`text-[11px] font-medium px-3 py-0.5 rounded ${getStatusTagColor()}`}
            >
              {status}
            </div>
          )}
          <div
            className={`text-[11px] font-medium px-3 py-0.5 rounded ${getPriorityTagColor()}`}
          >
            {priority} Priority
          </div>
          {overdueTag}
        </div>

        {status !== "completed" ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateStatus();
            }}
            className="flex items-center text-sm text-green-600 hover:text-green-700"
          >
            <RadioButtonUncheckedIcon fontSize="small" className="mr-1" />
            Mark as Completed
          </button>
        ) : (
          <div className="flex items-center text-sm text-green-600">
            <CheckCircleIcon fontSize="small" className="mr-1" />
            Task Completed
          </div>
        )}
      </div>

      <div
        className="border-l-[3px] pl-3 mb-3"
        style={{ borderColor: status === "pending" ? "#7c3aed" : "#84cc16" }}
      >
        <p className="text-base font-semibold text-text-primary line-clamp-2">
          {title}
        </p>
        <p className="text-sm text-text-secondary mt-1 line-clamp-2 leading-[1.3rem]">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-text-secondary">
        <div>
          <label className="block text-xs">Start</label>
          <p className="text-text-primary">
            {moment(createdAt).format("Do MMM YYYY")}
          </p>
        </div>
        <div>
          <label className="block text-xs">Due</label>
          <p className="text-text-primary">
            {moment(dueDate).format("Do MMM YYYY")}
          </p>
        </div>
        <div className="ml-auto">
          <AvatarGroup avatars={assignedTo || []} maxVisible={3} />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
