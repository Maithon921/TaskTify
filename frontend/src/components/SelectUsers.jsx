import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Modal from "./Modal";
import AvatarGroup from "./AvatarGroup.jsx";

function SelectUsers({ selectedUsers, setSelectedUsers }) {
  const [allUsers, setAllUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/user/");
      if (response.data.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setModalOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.username);
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
    return () => {};
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2">
      {selectedUserAvatars.length === 0 && (
        <button className="card-btn" onClick={() => setModalOpen(true)}>
          <PersonAddIcon fontSize="small" /> Add Members{" "}
        </button>
      )}

      {selectedUsers.length > 0 && (
        <div className="cursor-pointer" onClick={() => setModalOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Select Users"
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 border-b border-gray-200 "
            >
              <div className="flex-1">
                <p className=" font-medium text-text-primary">
                  {user.username}
                </p>
                <p className="text-[13px] text-text-secondary">{user.email}</p>
              </div>{" "}
              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none"
              />{" "}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button className="card-btn" onClick={() => setModalOpen(false)}>
            CANCEL
          </button>
          <button className="card-btn-fill" onClick={handleAssign}>
            DONE
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default SelectUsers;
