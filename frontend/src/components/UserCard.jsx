function UserCard({ userInfo }) {
  return (
    <div className="user-card p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-text-primary text-xl w-12 h-12 rounded-full bg-orange-200 border border-white flex justify-center items-center capitalize font-medium">
            {userInfo.username.charAt(0)}
          </p>
          <div>
            <p className="text-sm font-medium capitalize">
              {userInfo?.username}
            </p>
            <p className="text-xs text-gray-500">{userInfo.email}</p>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTask || 0}
          status="pending"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTask || 0}
          status="completed"
        />
      </div>
    </div>
  );
}

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "pending":
        return "text-violet-500 bg-gray-50";
      case "completed":
        return "text-cyan-500 bg-gray-50";
      default:
        return "text-indigo-500 bg-gray-50";
    }
  };

  return (
    <div
      className={`flex-1 text-[10px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}
    >
      <span className="text-[12px] font-semibold">{count}</span> <br /> {label}
    </div>
  );
};
