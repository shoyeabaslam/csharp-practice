import { FaPlus } from "react-icons/fa6";
import AddTask from "../addtask/AddTask";
import { useState } from "react";
import { GrAchievement } from "react-icons/gr";

const SearchBar = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const handleAddNewTask = async () => {
    setIsAddTaskOpen((prev) => !prev);
  };
  return (
    <div className="w-full flex py-2 justify-between bg-white  rounded-lg px-2">
      <input
        type="text"
        className="outline-none px-2 py-1 border rounded-xl bg-transparent text-sm w-[300px]"
        placeholder="Search"
      />

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <GrAchievement />
          <span className="text-sm  font-light">200 Points</span>
        </div>
        <button
          onClick={handleAddNewTask}
          className="flex items-center px-4 border border-slate-800 bg-yellow-300  rounded-full py-1 justify-center space-x-2"
        >
          <FaPlus />
          <span>New Task</span>
        </button>
        {isAddTaskOpen && <AddTask setIsAddTaskOpen={setIsAddTaskOpen} />}
      </div>
    </div>
  );
};

export default SearchBar;
