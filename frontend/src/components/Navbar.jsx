import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ activeMenu, setActiveMenu }) {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop:blur[2px] py-4 px-7 sticky top-0 z-50">
        <button
          className="block lg:hidden text-text-primary"
          onClick={() => setSidebar(!sidebar)}
        >
          {sidebar ? (
            <CloseIcon className="text-2xl" />
          ) : (
            <MenuIcon className="text-2xl" />
          )}
        </button>
        <h2 className="text-2xl font-bold text-primary">
          TASK<span className="text-text-primary">TIFY</span>
        </h2>
      </div>

      {sidebar && (
        <div className="fixed top-[61px] -ml-4 bg-card">
          <Sidebar
            activeMenu={activeMenu}
            setActiveMenu={(key) => {
              setActiveMenu(key);
              setSidebar(false);
            }}
          />
        </div>
      )}
    </>
  );
}

export default Navbar;
