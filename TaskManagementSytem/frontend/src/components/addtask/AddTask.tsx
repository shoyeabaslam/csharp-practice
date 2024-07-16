import { FC, useState } from "react";
import InputForm from "../inputform/InputForm";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CategoryListState, TaskListState, UserState } from "../../store/atoms";
import { PriorityEnum } from "../../contants/PriorityEnum";
import { GetPriorityColor } from "../../contants/GetPriorityColor";
import { CgClose } from "react-icons/cg";
import { PiFlagPennantFill } from "react-icons/pi";
import { TaskStatusEnum } from "../../contants/TaskStatusEnum";
import { TaskType, TaskWithCategoryId } from "../../types/TaskType";
import toast from "react-hot-toast";
import { AddTaskToDb } from "../../api/Tasks";
import { FormatDateForInput } from "../../contants/FormatDateForInput";

interface Type {
  setIsAddTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTask: FC<Type> = ({ setIsAddTaskOpen }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>();
  const [dueDate, setDueDate] = useState<string>();
  const [priority, setPriority] = useState<string>("");

  const categories = useRecoilValue(CategoryListState); // category global state
  const user = useRecoilValue(UserState); // user global state
  const setTasks = useSetRecoilState(TaskListState);

  const updateTasksState = (newTask: TaskWithCategoryId) => {
    // destructuring the newTask
    const { categoryId, ...filteredTask } = newTask;
    const categoryName = categories.filter(
      (category) => category.categoryId === categoryId
    )[0].categoryName;
    const task: TaskType = {
      ...filteredTask,
      categoryName: categoryName,
    };
    setTasks((prev) => {
      const data = [...prev, { ...task }];
      return data;
    });
  };
  const handleAddTask = async () => {
    if (!user) {
      toast.error("User is not logged in.");
      return;
    }

    if (!dueDate) {
      toast.error("Due date is required.");
      return;
    }
    const task: TaskType = {
      taskName,
      taskDescription,
      userId: user?.userId,
      categoryId: categoryId as number,
      dueDate: FormatDateForInput(dueDate),
      status: TaskStatusEnum.Pending,
      priority,
      createdAt: FormatDateForInput(new Date().toISOString()),
    };

    try {
      const data = await AddTaskToDb(task);
      updateTasksState({ ...task, taskId: data.taskId });
      toast.success("Task added successfully");
    } catch (err) {
      console.error(err);
      toast.error("error while adding the task");
    }
    setIsAddTaskOpen((prev) => !prev);
  };

  return (
    <div className="z-[1000] w-full h-full fixed inset-1 bg-white/80 flex justify-center items-center text-slate-900">
      <div className="p-4 w-[400px] bg-white shadow-2xl rounded-lg border border-gray-200 relative">
        <div className="absolute right-3 top-2 text-2xl">
          <CgClose
            className=" cursor-pointer"
            onClick={() => setIsAddTaskOpen((prev) => !prev)}
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
          <label>Categoryies</label>
          <select
            className="outline-none border rounded-md py-1 border-slate-700"
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
            defaultValue={"Select Category"}
          >
            <option disabled>Select Category</option>
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
            type="datetime-local"
            onChange={(e) => setDueDate(e.target.value)}
            className="border outline-none rounded-md px-2 py-1 border-slate-500"
          />
        </div>

        <div className="flex items-center justify-between my-6">
          {Object.values(PriorityEnum).map((priority, index) => (
            <div
              key={index}
              className={`flex space-x-1 items-center font-medium ${GetPriorityColor(
                priority
              )}`}
            >
              <label htmlFor={priority} className="flex items-center space-x-1">
                <PiFlagPennantFill />
                <span>{priority}</span>
              </label>
              <input
                id={priority}
                type="radio"
                className={`${
                  priority === PriorityEnum.Priority1
                    ? "accent-red-600"
                    : priority === PriorityEnum.Priority2
                    ? "accent-yellow-700 "
                    : "accent-green-700"
                } scale-125 mt-[2px]`}
                value={priority}
                name="Priorities"
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={handleAddTask}
            className="bg-yellow-500 rounded-lg w-full py-1 font-medium"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
