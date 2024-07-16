import { FC } from "react";
import { IoMdLock } from "react-icons/io";

const Badge: FC<{
  pointsRequired: number;
  userPoints: number;
  imageUrl: string;
}> = ({ pointsRequired, userPoints, imageUrl }) => {
  const isUnlocked = userPoints >= pointsRequired;

  return (
    <div className="badge flex flex-col items-center justify-center rounded-lg relative  w-[120px] h-[120px] overflow-hidden shadow-lg">
      <img src={imageUrl} className="w-[100px] h-[100px] object-cover" />
      {!isUnlocked && (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-gray-100/95 flex flex-col items-center justify-center text-5xl text-slate-900">
          <IoMdLock />
          <span className="text-xs px-2 text-center font-semibold text-slate-950">{`${pointsRequired} points requried to unlock`}</span>
        </div>
      )}
    </div>
  );
};

export default Badge;
