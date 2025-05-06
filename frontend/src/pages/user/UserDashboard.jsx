import DashboardLayout from "../../components/DashboardLayout.jsx";
import DashboardOverview from "../DashboardOverview.jsx";

function UserDashboard() {
  return (
    <DashboardLayout activeMenu="Dashboard">
      <DashboardOverview />
    </DashboardLayout>
  );
}

export default UserDashboard;
