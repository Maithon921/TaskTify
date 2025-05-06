import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import UserCard from "../../components/UserCard";
import DashboardLayout from "../../components/DashboardLayout";

const ManageUser = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/user/");
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    getAllUsers();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex items-center">
          <h2 className="text-2xl md:text-3xl text-primary font-medium">
            Team Members
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
export default ManageUser;
