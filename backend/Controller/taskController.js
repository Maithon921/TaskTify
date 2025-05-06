import User from "../Model/userModel.js";
import Task from "../Model/taskModel.js";

// Get tasks (Admin: all tasks, Member: tasks assigned to the logged-in user)
export const getTasks = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const tasks = await Task.find({})
        .sort({ createdAt: -1 })
        .populate("assignedTo", "username email");
      res.json(tasks);
    } else {
      const tasks = await Task.find({ assignedTo: req.user._id }).populate(
        "assignedTo",
        "username email"
      );
      res.json(tasks);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get task by ID with populated user info
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "username email"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not available" });
    }

    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Create a new task (only for admins)
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignedTo, createdBy } =
      req.body;
    if (!Array.isArray(assignedTo)) {
      return res
        .status(400)
        .json({ message: "assignedTo must be an array of user IDs" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
    });
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Update task details
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not available" });
    }

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not available" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Update task status (Pending/Completed)
export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = task.status === "pending" ? "completed" : "pending";
    const updatedStatus = await task.save();

    res.json({ message: "Status updated", updatedStatus });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const allTasks = await Task.find({}); // all tasks

    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(
      (task) => task.status === "completed"
    ).length;
    const pendingTasks = allTasks.filter(
      (task) => task.status === "pending"
    ).length;

    const overdueTasks = allTasks.filter(
      (task) =>
        task.status !== "completed" && new Date(task.dueDate) < new Date()
    ).length;

    const recentTasks = await Task.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("assignedTo", "username email");

    const totalMembers = await User.countDocuments({ role: "member" });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      totalMembers,
      recentTasks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUserDashboardData = async (req, res) => {
  try {
    const allUserTasks = await Task.find({ assignedTo: req.user._id });

    const totalTasks = allUserTasks.length;
    const completedTasks = allUserTasks.filter(
      (task) => task.status === "completed"
    ).length;
    const pendingTasks = allUserTasks.filter(
      (task) => task.status === "pending"
    ).length;

    const overdueTasks = allUserTasks.filter(
      (task) =>
        task.status !== "completed" && new Date(task.dueDate) < new Date()
    ).length;

    const recentTasks = await Task.find({ assignedTo: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      recentTasks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
