import { IconType } from "react-icons";
import logo from "../../assets/images/logo.png";
import { menuOptions } from "../../contants/MenuOptions";
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Menu = () => {
  const [currentPath, setCurrentPath] = useState<string>();
  const location = useLocation();
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  return (
    <div className="fixed left-0 top-0 w-[250px] h-[100%] flex justify-center pt-6 pl-2 text-slate-950">
      <div className="w-[90%] h-[95%] bg-white rounded-xl p-4">
        <div className="menu_wrapper flex flex-col justify-between  h-full">
          <div className="top_wrapper">
            <div className="flex items-center space-x-4">
              <img src={logo} className="w-8 rounded-full" />
              <h2 className="font-bold">TaskZone</h2>
            </div>
            <div className="my-6">
              <ul>
                {menuOptions.map((option, index) => {
                  const Icon = option.icon as IconType; // Ensure type is IconType
                  return (
                    <Link to={option.route} key={index}>
                      <li
                        className={`flex items-center p-2 space-x-3 my-4 rounded-md ${
                          currentPath === option.route &&
                          "bg-yellow-50 border-l-4 border-l-yellow-400"
                        }`}
                      >
                        <Icon className="mr-2" />
                        <span>{option.name}</span>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="bottom_wrapper flex space-x-3 items-center border-t my-4 p-2 cursor-pointer hover:bg-yellow-50 hover:border-l-4 hover:border-l-yellow-400 transition-all duration-100 ease-in-out">
            <MdLogout />
            <span>Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
