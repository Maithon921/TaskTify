const DashboardInfoItem = ({ color, label, value, position = "left" }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2 h-3 md:h-5 rounded-full ${color}`} />
      <p className="text-xs md:text-[14px] text-text-secondary">
        {position === "left" && (
          <span className="text-sm md:text-[15px] text-black font-semibold pr-1">
            {value}
          </span>
        )}
        {label}
        {position === "right" && (
          <span className="text-sm md:text-[15px] text-black font-semibold pl-1">
            {value}
          </span>
        )}
      </p>
    </div>
  );
};

export default DashboardInfoItem;
