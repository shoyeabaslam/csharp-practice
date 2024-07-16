import { PriorityEnum } from "./PriorityEnum";

export const GetPriorityColor = (priority:string) => {
    switch (priority) {
      case PriorityEnum.Priority1:
        return "text-red-600";
      case PriorityEnum.Priority2:
        return "text-yellow-700";
      case PriorityEnum.Priority3:
        return "text-green-700";
      default:
        return "text-gray-500";
    }
  };
  