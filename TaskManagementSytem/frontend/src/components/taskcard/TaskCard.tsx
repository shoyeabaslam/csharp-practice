import { FC, useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import "./taskcard.css";
import { GetPriorityColor } from "../../contants/GetPriorityColor";
import { TaskType, TaskWithCategoryName } from "../../types/TaskType";
import { GetTimeAndDay } from "../../contants/GetTimeAndDay";
import UpdateTask from "../updatetask/UpdateTask";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CategoryListState, TaskListState } from "../../store/atoms";
import { TaskStatusEnum } from "../../contants/TaskStatusEnum";
import { UpdateTaskToDb } from "../../api/Tasks";
import toast from "react-hot-toast";

const TaskCard: FC<{ task: TaskType }> = ({ task }) => {
  const [isUpdateWindowOpen, setIsUpdateWindowOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType>();
  const categories = useRecoilValue(CategoryListState);
  const setTasks = useSetRecoilState(TaskListState);

  const handleUpdate = (task: TaskType) => {
    setCurrentTask(task);
    setIsUpdateWindowOpen((prev) => !prev);
  };

  const handleTaskStatus = async () => {
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
    <div className="w-[350px] h-[200px] bg-gray-50/50 px-3 rounded border border-gray-100 shadow-gray-300 shadow-md m-2 relative">
      <div className="absolute right-2 top-2 text-slate-700">
        {isUpdateWindowOpen && (
          <UpdateTask
            currentTask={currentTask!}
            setIsUpdateWindowOpen={setIsUpdateWindowOpen}
          />
        )}
        <MdOutlineEditNote
          onClick={() => handleUpdate(task)}
          className="text-3xl cursor-pointer"
        />
      </div>
      <div className="p-1 py-4 h-full flex flex-col">
        <div
          className={`text-sm font-medium ${GetPriorityColor(task.priority)}`}
        >
          {task.priority}
        </div>
        <h2 className="block mt-2 text-lg leading-tight font-medium text-slate-800">
          {task.taskName}
        </h2>
        <p className="flex-1 mt-1 text-gray-500">{task.taskDescription}</p>
        <div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500 text-sm">
              {GetTimeAndDay(task.dueDate).taskTime}
            </span>
            <span className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {(task as TaskWithCategoryName).categoryName}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500 text-sm">
              {GetTimeAndDay(task.dueDate).taskDueDay}
            </span>
            <span className="custom_checkbox flex justify-end">
              <input
                type="checkbox"
                checked={task.status === TaskStatusEnum.Successs}
                onChange={handleTaskStatus}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
