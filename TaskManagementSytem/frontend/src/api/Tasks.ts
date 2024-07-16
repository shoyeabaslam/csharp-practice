import axios from "axios";
import { TaskType } from "../types/TaskType";

export const GetTasksByUserId =  async(userId:number)=>{
    const url = `${import.meta.env.VITE_TASKS_ENDPOINT}/${userId}`;
    const res = await fetch(url);
    return res;
}


export const AddTaskToDb = async (task:Omit<TaskType,'taskId'>):Promise<TaskType> =>{
    try{
        const res = await axios.post<TaskType>(import.meta.env.VITE_TASKS_ENDPOINT,task);
        return res.data;
    }catch(err){
        console.error("Error in adding task",err);
        throw err; 
    }
}

export const  UpdateTaskToDb = async(taskId:number,task:Omit<TaskType,'taskId'>) =>{
    try{
        const url = import.meta.env.VITE_TASKS_ENDPOINT + "/" + taskId
        const res = await axios.put(url,task);
        return res.data;
    }catch(err){
        console.error("error in updating",err);
        throw err; 
    }
}


export const DeleteTaskFromDb = async(taskId:number)=>{
    try{
        const url = import.meta.env.VITE_TASKS_ENDPOINT + "/" + taskId
        await axios.delete(url);
    }catch(err){
        console.error('error while deleting',err);
        throw err; 
    }
}