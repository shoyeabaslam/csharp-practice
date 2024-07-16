import { FC } from "react";
import { InputType } from "./InputType";

const InputForm: FC<InputType> = ({
  name,
  type,
  placeholder,
  value,
  setValue,
}) => {
  return (
    <div className="flex flex-col my-2 space-y-1">
      <label htmlFor={name} className="">
        {name}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border outline-none rounded-md px-2 py-1 border-slate-500"
      />
    </div>
  );
};

export default InputForm;
