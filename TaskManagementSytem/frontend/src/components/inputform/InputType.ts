export interface InputType{
    name:string,
    type:string,
    placeholder:string,
    value:string,
    setValue:React.Dispatch<React.SetStateAction<string >>
}