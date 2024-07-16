import { atom } from "recoil";
import { UserType } from "../types/UserType";
import { TaskType } from "../types/TaskType";
import { CategoryType } from "../types/CategoryType";



export const UserState = atom<UserType | null>({
    key:"user",
    default:null
})

export const TaskListState = atom<TaskType[]>({
    key:"tasks",
    default:[]
})

export const CategoryListState = atom<CategoryType[]>({
    key:"categories",
    default:[]
})