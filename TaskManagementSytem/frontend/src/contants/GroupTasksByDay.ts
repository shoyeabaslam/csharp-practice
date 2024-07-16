import { TaskType } from "../types/TaskType";
import { TaskStatusEnum } from "./TaskStatusEnum";

export const GroupTasksByDay = (tasks:TaskType[]) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const taskCounts:{
      [key:string]:number
    } = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };
  
    tasks.forEach((task) => {
      if(task.status === TaskStatusEnum.Successs){
        const dayIndex = new Date(task.dueDate).getDay();
        const dayName = daysOfWeek[dayIndex];
        taskCounts[dayName]++;
      }
    });
  
    const chartData = Object.keys(taskCounts).map((day) => ({
      week: day,
      tasks: taskCounts[day],
    }));
  
    return chartData;
  };
  