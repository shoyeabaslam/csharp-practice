import { FC, useEffect, useState } from "react";
import InputForm from "../inputform/InputForm";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CategoryListState, TaskListState, UserState } from "../../store/atoms";
import { PriorityEnum } from "../../contants/PriorityEnum";
import { GetPriorityColor } from "../../contants/GetPriorityColor";
import { CgClose } from "react-icons/cg";
import { PiFlagPennantFill } from "react-icons/pi";
import {
  TaskType,
  TaskWithCategoryId,
  TaskWithCategoryName,
} from "../../types/TaskType";
import toast from "react-hot-toast";
import { DeleteTaskFromDb, UpdateTaskToDb } from "../../api/Tasks";
import { FormatDateForInput } from "../../contants/FormatDateForInput";

interface Type {
  setIsUpdateWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentTask: TaskType;
}

const UpdateTask: FC<Type> = ({ setIsUpdateWindowOpen, currentTask }) => {
  const [taskName, setTaskName] = useState<string>(currentTask.taskName);
  const [taskDescription, setTaskDescription] = useState<string>(
    currentTask.taskDescription
  );
  const [categoryId, setCategoryId] = useState<number>();
  const [dueDate, setDueDate] = useState<string>(currentTask.dueDate);
  const [priority, setPriority] = useState<string>(currentTask.priority);

  const categories = useRecoilValue(CategoryListState);

  const user = useRecoilValue(UserState);
  const setTasks = useSetRecoilState(TaskListState);

  useEffect(() => {
    const cId = categories.find(
      (c) =>
        c.categoryName === (currentTask as TaskWithCategoryName).categoryName
    )?.categoryId;
    if (cId) {
      setCategoryId(cId);
    }
  }, [categories, currentTask, categoryId]);
  const getDefaultCategoryId = (): number | undefined => {
    return categories.find(
      (c) =>
        c.categoryName === (currentTask as TaskWithCategoryName).categoryName
    )?.categoryId;
  };
  const updateTasksState = (updatedTask: TaskWithCategoryId) => {
    const { categoryId, ...filteredTask } = updatedTask;
    const categoryName = categories.find(
      (category) => category.categoryId === categoryId
    )?.categoryName;

    if (!categoryName) {
      console.error(`Category with id ${categoryId} not found.`);
      return;
    }

    setTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task.taskId === updatedTask.taskId
          ? { ...task, ...filteredTask, categoryName }
          : task
      );
    });
  };

  const handleUpdateTask = async () => {
    if (!user) {
      toast.error("User is not logged in.");
      return;
    }

    if (!dueDate) {
      toast.error("Due date is required.");
      return;
    }

    const updatedTask: TaskWithCategoryId = {
      taskId: currentTask.taskId,
      taskName,
      taskDescription,
      userId: user?.userId,
      categoryId: categoryId as number,
      dueDate: FormatDateForInput(dueDate),
      status: currentTask.status,
      priority,
      createdAt: currentTask.createdAt,
    };
    console.log(updatedTask);
    try {
      await UpdateTaskToDb(currentTask.taskId!, updatedTask);
      updateTasksState(updatedTask);
      toast.success("Task updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error while updating the task");
    }

    setIsUpdateWindowOpen(false);
  };

  const handleTaskDelete = async () => {
    try {
      if (currentTask.userId !== undefined) {
        await DeleteTaskFromDb(currentTask.taskId!);
        setTasks((prev) => {
          const filterTask = prev.filter(
            (task) => task.taskId !== currentTask.taskId
          );
          return filterTask;
        });
        toast.success("Successfully task deleted");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while deleting task");
    }
    setIsUpdateWindowOpen(false);
  };

  return (
    <div className="z-[1000] w-full h-full fixed inset-1 bg-white/80 flex justify-center items-center text-slate-900">
      <div className="p-4 w-[400px] bg-white shadow-2xl rounded-lg border border-gray-200 relative">
        <div className="absolute right-3 top-2 text-2xl">
          <CgClose
            className=" cursor-pointer"
            onClick={() => setIsUpdateWindowOpen(false)}
          />
        </div>

        <InputForm
          name="Task Name"
          type="text"
          placeholder="Eg: Waking up early"
          value={taskName}
          setValue={setTaskName}
        />
        <div className="flex flex-col space-y-2 my-2">
          <label htmlFor="Task Description">Task Description</label>
          <textarea
            id="Task Description"
            className="border border-slate-700 outline-none rounded-md w-full p-2"
            rows={2}
            name="Task Description"
            placeholder="Eg: Waking up early"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full h-full space-y-1">
          <label>Categories</label>
          <select
            name="categories"
            className="outline-none border rounded-md py-1 border-slate-700"
            defaultValue={getDefaultCategoryId() || 0} // Use value instead of defaultValue
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
          >
            <option disabled value={0}>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col my-2 space-y-1">
          <label htmlFor="duedate" className="">
            Due Date
          </label>
          <input
            id="duedate"
            value={FormatDateForInput(dueDate)}
            type="datetime-local"
            onChange={(e) => setDueDate(e.target.value)}
            className="border outline-none rounded-md px-2 py-1 border-slate-500"
          />
        </div>

        <div className="flex items-center justify-between my-6">
          {Object.values(PriorityEnum).map((p, index) => (
            <div
              key={index}
              className={`flex space-x-1 items-center font-medium ${GetPriorityColor(
                p
              )}`}
            >
              <label htmlFor={p} className="flex items-center space-x-1">
                <PiFlagPennantFill />
                <span>{p}</span>
              </label>
              <input
                id={p}
                defaultChecked={p === priority}
                type="radio"
                className={`${
                  p === PriorityEnum.Priority1
                    ? "accent-red-600"
                    : p === PriorityEnum.Priority2
                    ? "accent-yellow-700 "
                    : "accent-green-700"
                } scale-125 mt-[2px]`}
                value={p}
                name="Priorities"
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleTaskDelete}
            className="border bg-red-300  rounded-lg px-4 py-1 font-medium"
          >
            Delete
          </button>
          <button
            onClick={handleUpdateTask}
            className="bg-yellow-300 rounded-lg px-4 py-1 font-medium"
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
