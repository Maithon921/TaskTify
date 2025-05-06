import { useAuthHook } from "../../hook/useAuthHook.jsx";
import DashboardOverview from "../DashboardOverview.jsx";
import DashboardLayout from "../../components/DashboardLayout.jsx";

function Dashboard() {
  useAuthHook();


  return (
    <DashboardLayout activeMenu="Dashboard">
      <DashboardOverview />
    </DashboardLayout>
  );
}

export default Dashboard;
