import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import axiosInstance from "../utils/axiosInstance";
import moment from "moment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import TaskListTable from "../components/TaskListTable.jsx";
import DashboardInfoItem from "../components/DashboardInfoItem.jsx";

const DashboardOverview = () => {
  const { user } = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const endpoint =
          user?.role === "admin"
            ? "/task/dashboard-Data"
            : "/task/user-dashboard-Data";

        const { data } = await axiosInstance.get(endpoint);
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const seeMore = () => {
    if (user?.role === "admin") {
      navigate("/admin/manage-task");
    } else {
      navigate("/user/tasks");
    }
  };

  if (loading) {
    return <div className="text-secondary">Loading...</div>;
  }

  return (
    <div className=" my-5">
      <div className="card">
        <div className="col-span-3">
          <h2 className="text-xl sm:text-2xl text-primary font-semibold capitalize">
            WellCome! {user?.username}
          </h2>
          <p className="text-sm md:text-[13px] text-text-secondary mt-1.5">
            {moment().format("dddd Do MMMM YYYY")}
          </p>
        </div>
        <h2 className=" text-xl sm:text-2xl font-semibold text-primary mt-5">
          Dashboard Overview
        </h2>
        <div className="mt-5 grid sm:grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          <DashboardInfoItem
            color="bg-primary"
            label="Total Task"
            value={dashboardData?.totalTasks}
          />
          <DashboardInfoItem
            color="bg-lime-500"
            label="Completed Task"
            value={dashboardData?.completedTasks}
          />
          <DashboardInfoItem
            color="bg-violet-500"
            label="Pending Task"
            value={dashboardData?.pendingTasks}
          />
          <DashboardInfoItem
            color="bg-red-500"
            label="Overdue Task"
            value={dashboardData?.overdueTasks}
          />
          {user?.role === "admin" && dashboardData?.totalMembers && (
            <DashboardInfoItem
              color="bg-red-500"
              label="Total Members"
              value={dashboardData?.totalMembers}
            />
          )}
        </div>
      </div>

      {/* Recent task */}

      <div className="card grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div className="md:col-span-2">
          <div className=" p-0">
            <div className="flex items-center justify-between">
              <h5 className="text-lg">Recent Task</h5>
              <button className="card-btn" onClick={seeMore}>
                {" "}
                See All <ArrowForwardIcon fontSize="small" />
              </button>
            </div>
            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
