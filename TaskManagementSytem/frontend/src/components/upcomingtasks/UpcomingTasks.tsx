import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion } from "framer-motion";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { upcomingTasksSelector } from "../../store/selectors";
import { TaskType, TaskWithCategoryName } from "../../types/TaskType";
import { GetTimeAndDay } from "../../contants/GetTimeAndDay";
import { CategoryListState, TaskListState } from "../../store/atoms";
import { TaskStatusEnum } from "../../contants/TaskStatusEnum";
import { UpdateTaskToDb } from "../../api/Tasks";
import toast from "react-hot-toast";
import { FaRegSmile } from "react-icons/fa";

const UpcomingTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>();
  const [countTask, setCountTask] = useState(0);
  const upcomingTasks = useRecoilValue(upcomingTasksSelector);
  const categories = useRecoilValue(CategoryListState);
  const setTaskItems = useSetRecoilState(TaskListState);

  useEffect(() => {
    setTasks(
      upcomingTasks.slice(
        countTask,
        Math.min(4 + countTask, upcomingTasks.length)
      )
    );
  }, [countTask, upcomingTasks]);

  const handleNext = () => {
    if (countTask < upcomingTasks.length - 1) {
      setCountTask((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (countTask > 0) {
      setCountTask((prev) => prev - 1);
    }
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
      setTaskItems((prevTasks) =>
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
    <div className="h-[300px] bg-yellow-300 w-[400px] rounded-lg overflow-hidden relative">
      <div className="p-5 space-y-6 relative">
        <div>
          <h3 className="text-slate-800 font-medium text-lg">Upcoming Tasks</h3>
        </div>
      </div>
      {(!tasks || tasks.length === 0) && (
        <div className="flex flex-col items-center pt-8 space-y-4 text-slate-800">
          <FaRegSmile className="text-6xl" />
          <h1 className="text-xl font-medium">No Upcoming Tasks!</h1>
        </div>
      )}
      {tasks && (
        <div>
          {tasks &&
            tasks.map((task, i) => (
              <motion.div
                key={task.taskId}
                className="w-[270px] h-[150px] rounded-lg absolute top-[90px] flex shadow-lg border border-gray-500 "
                style={{
                  zIndex: tasks.length - i,
                  left: `${i * 35 + 20}px`,
                  scale: `${1 - i * 0.1}`,
                  backgroundColor: `rgba(${90 - i * 10},${90 - i * 10},${
                    90 - i * 10
                  },1)`,
                }}
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-2 w-full text-gray-300 flex flex-col">
                  <div className="text-xs flex justify-between ">
                    <span className="font-bold">{task.priority}</span>
                    <span className="">
                      {GetTimeAndDay(task.dueDate).taskDueDay}
                    </span>
                  </div>
                  <div className="text-sm my-1 font-bold">
                    <h1>{task.taskName}</h1>
                  </div>
                  <div className="text-xs flex-1">
                    <p>{task.taskDescription}</p>
                  </div>
                  <div className="w-full px-8">
                    <button
                      onClick={() => handleTaskStatus(task)}
                      className="bg-yellow-500/80 font-medium w-full rounded-xl text-black"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          {tasks.length !== 0 && (
            <motion.div
              className="bg-slate-700 text-slate-50 rounded-full absolute right-2 p-1 flex items-center w-6 h-6 top-[40%] z-10 cursor-pointer"
              onClick={handleNext}
              whileTap={{ scale: 0.9 }}
            >
              <AiOutlineRight />
            </motion.div>
          )}
          {tasks.length !== 0 && (
            <motion.div
              className="bg-slate-700 text-slate-50 rounded-full absolute right-2 p-1 flex items-center w-6 h-6 top-[60%] z-10 cursor-pointer"
              onClick={handlePrev}
              whileTap={{ scale: 0.9 }}
            >
              <AiOutlineLeft />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingTasks;
