import axios from "axios";
import { CategoryType } from "../types/CategoryType";

export const GetCategoriesByUserId = async (userId:number)=>{
    const url = `${import.meta.env.VITE_CATEGORIES_ENDPOINT}/${userId}`;
    const res = await fetch(url);
    return res;
}

export const AddCategoriesToDb = async (category:Omit<CategoryType,'categoryId'>):Promise<CategoryType> =>{
    try{
        const res = await axios.post(import.meta.env.VITE_CATEGORIES_ENDPOINT,category);
        return res.data;
    }catch(err){
        console.error(err);
        throw err;
    }
}


export const DeleteCategoryFromDb = async (category:CategoryType)=>{
    try{
        const url = import.meta.env.VITE_CATEGORIES_ENDPOINT + '/' + category.categoryId;
        const res = await axios.delete(url);
        return res.data;
    }catch(err){
        console.error(err);
        throw err;
    }
}