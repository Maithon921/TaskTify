import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden ">
            <Sidebar activeMenu={activeMenu} />
          </div>
          <div className="grow mx-2 sm:mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
