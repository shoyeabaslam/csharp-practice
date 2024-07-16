import { FC } from "react";
import Badge from "./Badge";
import badges from "../../assets/images/badges";

const badgesData = [
  {
    name: "Starter Badge",
    pointsRequired: 50,
    imageUrl: badges.badge1,
  },
  {
    name: "Motivated Badge",
    pointsRequired: 100,
    imageUrl: badges.badge2,
  },
  {
    name: "Dedicated Badge",
    pointsRequired: 250,
    imageUrl: badges.badge3,
  },
  {
    name: "Proactive Badge",
    pointsRequired: 500,
    imageUrl: badges.badge4,
  },
  {
    name: "Champion Badge",
    pointsRequired: 1000,
    imageUrl: badges.badge5,
  },
];

const BadgeList: FC<{ userPoints: number }> = ({ userPoints }) => {
  return (
    <div className="badge-list  w-[70%] bg-white p-4 rounded-lg ">
      <h3 className="text-lg font-medium text-slate-800">Badges</h3>
      <div className="w-full flex justify-between">
        {badgesData.map((badge) => (
          <Badge
            key={badge.name}
            pointsRequired={badge.pointsRequired}
            userPoints={userPoints}
            imageUrl={badge.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default BadgeList;
