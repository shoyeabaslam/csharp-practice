import { selector } from "recoil";
import { TaskListState } from "./atoms";
import { TaskType } from "../types/TaskType";
import { TaskStatusEnum } from "../contants/TaskStatusEnum";
import { GetFullDate } from "../contants/GetFullDate";
import { GetDateRange } from "../contants/GetDateRange";
import { GroupTasksByDay } from "../contants/GroupTasksByDay";

interface WeekTaskType{
  week:string,
  tasks:number
}


export const  filteredTasksByPriority = selector({
    key: 'filteredTasksByPrioritySelector',
    get: ({ get }) => {
      const tasks = get(TaskListState);
      return (priority: string,date:Date): TaskType[] => {
        return tasks.filter((task) => {
          return task.priority === priority && task.status === TaskStatusEnum.Pending  && GetFullDate(new Date(task.dueDate)) === GetFullDate(date);
        });
      };
    },
  });

export const filteredPendingTask = selector({
  key:"filterPendingTask",
  get:({get})=>{
    const tasks = get(TaskListState);
    return tasks.filter(task => task.status === TaskStatusEnum.Pending);
  }
})

export const filteredSuccesssTask = selector({
  key:"filterSuccesssTask",
  get:({get})=>{
    const tasks = get(TaskListState);
    return tasks.filter(task => task.status === TaskStatusEnum.Successs);
  }
})


export const filterWeekTask = selector<WeekTaskType[]>({
  key:'filterWeekTask',
  get:({get})=>{
    const tasks = get(TaskListState);
    const {fromDate,toDate} = GetDateRange(new Date());
    const weekTasks = tasks.filter(task => GetFullDate(new Date(task.dueDate)) >= GetFullDate(fromDate) && GetFullDate(new Date(task.dueDate)) <= GetFullDate(toDate));

    return GroupTasksByDay(weekTasks);
  }
})

export const upcomingTasksSelector = selector({
  key:'upcomingTask',
  get:({get})=>{
    const tasks = get(TaskListState);
    return tasks.filter((task)=> GetFullDate(new Date(task.dueDate)) >= GetFullDate(new Date()) && task.status === TaskStatusEnum.Pending);
  }
})