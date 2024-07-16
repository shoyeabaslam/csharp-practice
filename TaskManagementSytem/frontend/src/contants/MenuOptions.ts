import { MdOutlineDashboard  } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { ROUTES } from "./routes";

export const menuOptions = [
    {
      name: "Dashboard",
      icon: MdOutlineDashboard,
      route:ROUTES.HOME
    },
    {
      name: "MyTask",
      icon: FaTasks ,
      route:ROUTES.MYTASK
    },
  ];