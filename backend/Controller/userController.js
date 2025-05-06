import Task from "../Model/taskModel.js";
import User from "../Model/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");

    const userWithTaskCount = await Promise.all(
      users.map(async (user) => {
        const pendingTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "pending",
        });
        const completedTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "completed",
        });

        return {
          ...user._doc,
          pendingTask,
          completedTask,
        };
      })
    );

    res.json(userWithTaskCount);
  } catch (error) {
    res
      .status(500)
      .json({ message: " Internal server error", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not available" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: " Internal server error", error: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted succesfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: " Internal server error", error: error.message });
  }
};
