import { useRecoilValue } from "recoil";
import BadgeList from "../../components/badgelist/BadgeList";
import Profile from "../../components/profile/Profile";
import SearchBar from "../../components/searchbar/SearchBar";
import TaskCard from "../../components/taskcard/TaskCard";
import {
  filteredPendingTask,
  filteredSuccesssTask,
} from "../../store/selectors";

const MyTask = () => {
  const pendingTasks = useRecoilValue(filteredPendingTask);
  const successTasks = useRecoilValue(filteredSuccesssTask);

  return (
    <div className="w-full">
      <SearchBar />
      <div className="my-4 flex space-x-6">
        <BadgeList userPoints={200} />
        <Profile />
      </div>
      <div className="bg-white rounded-lg p-3 my-4">
        <h3 className="text-slate-800 text-lg font-medium px-3 pb-2">
          Pending Tasks
        </h3>
        <div className="flex flex-wrap">
          {pendingTasks &&
            pendingTasks.map((task, index) => (
              <TaskCard key={index} task={task} />
            ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 my-4">
        <h3 className="text-slate-800 text-lg font-medium px-3 pb-2">
          Completed Tasks
        </h3>
        <div className="flex flex-wrap">
          {successTasks &&
            successTasks.map((task, index) => (
              <TaskCard key={index} task={task} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyTask;
