import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar({ activeMenu }) {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  const isAdmin = user?.role === "admin";

  const menuItems = isAdmin
    ? [
        {
          label: "Dashboard",
          key: "dashboard",
          icon: <DashboardIcon />,
          route: "/admin/dashboard",
        },
        {
          label: "Manage Tasks",
          key: "manage-tasks",
          icon: <AssignmentTurnedInIcon />,
          route: "/admin/manage-task",
        },
        {
          label: "Create Task",
          key: "create-task",
          icon: <AddBoxIcon />,
          route: "/admin/tasks",
        },
        {
          label: "Team Members",
          key: "team-members",
          icon: <PeopleIcon />,
          route: "/admin/users",
        },
      ]
    : [
        {
          label: "Dashboard",
          key: "dashboard",
          icon: <DashboardIcon />,
          route: "/user/dashboard",
        },
        {
          label: "My Tasks",
          key: "my-tasks",
          icon: <AssignmentTurnedInIcon />,
          route: "/user/tasks",
        },
      ];

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-40 ">
      {/* Profile */}
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="w-20 h-20 bg-secondary text-white rounded-full capitalize flex justify-center items-center text-4xl font-bold">
          {user?.username?.charAt(0)}
        </div>
        {isAdmin && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1 capitalize">
            Admin
          </div>
        )}
        <h5 className="text-text-primary capitalize font-medium leading-6 mt-3">
          {user?.username || ""}
        </h5>
        <p className="text-[12px] text-text-secondary">{user?.email}</p>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => handleClick(item.route)}
            className={`w-full flex items-center gap-4 py-3 px-6 mb-3 cursor-pointer text-[15px] transition-all duration-200 ${
              activeMenu === item.label
                ? "text-primary bg-linear-to-r from-orange-300 to-orange-500 border-r-4 border-primary"
                : "hover:bg-background"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mb-3 w-full text-left px-6 py-2 text-sm rounded transition-all duration-200"
        >
          <LogoutIcon />
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
