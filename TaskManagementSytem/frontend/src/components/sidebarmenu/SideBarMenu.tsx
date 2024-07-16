import { FC } from "react";
import Menu from "./Menu";

const SideBarMenu: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen  pl-[270px] pt-6 pr-8">
      <Menu />
      {children}
    </div>
  );
};

export default SideBarMenu;
