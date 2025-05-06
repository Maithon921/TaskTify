import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function SelectDropDown({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };
  return (
    <div className=" w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" w-full text-sm text-text-primary outline-none border border-slate-100 px-2.5 py-3 rounded-md mt-2 flex justify-between items-center "
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : placeholder}
        <span className="ml-2">
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </span>
      </button>

      {isOpen && (
        <div className="w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md ">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectDropDown;
