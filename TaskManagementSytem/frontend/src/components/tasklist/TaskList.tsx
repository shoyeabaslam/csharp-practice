import { HiFlag } from "react-icons/hi";
import "./tasklist.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filteredTasksByPriority } from "../../store/selectors";
import { PriorityEnum } from "../../contants/PriorityEnum";
import { GetPriorityColor } from "../../contants/GetPriorityColor";
import { GetTimeAndDay } from "../../contants/GetTimeAndDay";
import { FC, useState } from "react";
import UpdateTask from "../updatetask/UpdateTask";
import { TaskType, TaskWithCategoryName } from "../../types/TaskType";
import { TaskStatusEnum } from "../../contants/TaskStatusEnum";
import toast from "react-hot-toast";
import { CategoryListState, TaskListState } from "../../store/atoms";
import { UpdateTaskToDb } from "../../api/Tasks";

const TaskList: FC<{ date: Date | undefined }> = ({ date }) => {
  const filterTasks = useRecoilValue(filteredTasksByPriority);
  const [isUpdateWindowOpen, setIsUpdateWindowOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType>();
  const categories = useRecoilValue(CategoryListState);
  const setTasks = useSetRecoilState(TaskListState);

  const handleUpdate = (task: TaskType) => {
    setCurrentTask(task);
    setIsUpdateWindowOpen((prev) => !prev);
  };

  const handleTaskStatus = async (task: TaskType) => {
    const { categoryName, ...filteredTasks } = task as TaskWithCategoryName;
    const categoryId = categories.find(
      (category) => category.categoryName === categoryName
    )?.categoryId;
    const updatedPendingTask = {
      ...filteredTasks,
      status:
        task.status === TaskStatusEnum.Pending
          ? TaskStatusEnum.Successs
          : TaskStatusEnum.Pending,
      categoryId,
    };
    try {
      await UpdateTaskToDb(task.taskId!, updatedPendingTask);
      toast.success("Successfully updated status");
      setTasks((prevTasks) =>
        prevTasks.map((taskItem) =>
          taskItem.taskId === task.taskId
            ? {
                ...taskItem,
                status:
                  taskItem.status === TaskStatusEnum.Pending
                    ? TaskStatusEnum.Successs
                    : TaskStatusEnum.Pending,
              }
            : taskItem
        )
      );
    } catch (err) {
      console.error("Error occurred while updating status");
      toast.error("Error while updating status");
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg p-4 ">
      {isUpdateWindowOpen && (
        <UpdateTask
          currentTask={currentTask!}
          setIsUpdateWindowOpen={setIsUpdateWindowOpen}
        />
      )}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">My Tasks</h3>
      <hr className="my-3 border-gray-200" />
      <div className="scrollable_component h-64 mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
        <div className="grid grid-cols-3 gap-4">
          {Object.values(PriorityEnum).map((priority, index) => (
            <ul key={index} className="column">
              <li
                className={`font-semibold flex items-center space-x-2 ${GetPriorityColor(
                  priority
                )} mb-3 px-3`}
              >
                <HiFlag className="text-base" /> <span>{priority}</span>
              </li>
              {filterTasks(priority, date!).map((item, index) => (
                <li
                  key={index}
                  className="py-1 px-3 my-2 rounded-lg shadow-md flex items-center space-x-3 border border-gray-50 hover:bg-yellow-50 transition-colors duration-300"
                >
                  <input
                    onChange={() => handleTaskStatus(item)}
                    type="checkbox"
                    checked={item.status === TaskStatusEnum.Successs}
                    className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <h4
                    onClick={() => handleUpdate(item)}
                    className="cursor-pointer  truncate flex-1 text-gray-700 font-medium"
                  >
                    {item.taskName}
                  </h4>
                  <div className="flex flex-col text-xs text-gray-600">
                    <span>
                      {GetTimeAndDay(item.dueDate).taskTime.toUpperCase()}
                    </span>
                    <span className="text-end">
                      {GetTimeAndDay(item.dueDate).taskDueDay}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
