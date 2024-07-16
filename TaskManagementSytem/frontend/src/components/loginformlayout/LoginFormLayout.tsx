import { FC } from "react";
import { Link } from "react-router-dom";

const LoginFormLayout: FC<{
  toLink: string;
  linkText: string;
  title: string;
  subTitle: string;
}> = ({ toLink, linkText, title, subTitle }) => {
  return (
    <div className="left flex-1 flex flex-col justify-center items-start px-10 space-y-4 bg-gradient-to-bl from-yellow-100 via-yellow-200 to-yellow-300 relative overflow-hidden z-0">
      <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-b from-yellow-100 to-yellow-300 shadow -top-32 left-[40%]" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400 shadow top-[20%] z-[-1] -left-24" />
      <div className="absolute w-[50px] h-[50px] rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400 shadow top-[50%] right-12 z-[-1] " />
      <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-t from-yellow-300 to-yellow-100 shadow -bottom-24 right-32 z-[-1] " />
      <h1 className="text-6xl font-semibold ">{title}</h1>
      <h5 className="text-xl">{subTitle}</h5>
      <Link to={toLink}>
        <button className="bg-white px-12 py-1 rounded-lg font-semibold">
          {linkText}
        </button>
      </Link>
    </div>
  );
};

export default LoginFormLayout;
