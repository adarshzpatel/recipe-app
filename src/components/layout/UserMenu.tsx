import { FiChevronDown, FiLogOut, FiPlus } from "react-icons/fi";
import useCurrentUser from "../hooks/useCurrentUser";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import Loader from "../ui/Loader";

interface MenuItemProps {
  onClick: (() => void) | undefined;
  label: string;
  icon?:IconType
}

export const MenuItem = ({ onClick, label,icon:Icon }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="relative group hover:bg-gray-50 text-gray-600 hover:text-black   flex gap-3   select-none items-center p-3 px-4  outline-none "
    >
      {Icon && <Icon className="group-hover:-rotate-12 duration-200 ease-out group-hover:scale-105" size={16}/>}
      {label}
    </div>
  );
};

const UserMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);


  const toggleOpen = () => {
    setIsOpen((state) => !state);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div onClick={toggleOpen} className="bg-gray-100 h-[42px] cursor-pointer border border-gray-300  rounded-xl px-3 py-1 sm:px-4 sm:py-2 flex items-center gap-2">
          {user?.name}
          <FiChevronDown className={`duration-200 ease-out ${isOpen && 'rotate-180'}`} />
        </div>
      </div>
      {isOpen && (
        <div
          className="
          absolute
          rounded-xl
          bg-white
          overflow-hidden
          right-0
          w-40
          top-12
          text-sm
          border 
          border-gray-300
          shadow-lg
      "
        >
          <div className="flex divide-y  flex-col cursor-pointer">
            <MenuItem icon={FiPlus} onClick={() => navigate("/create")} label="Post Recipe" />
            <MenuItem icon={FiLogOut} onClick={logout} label="Logout" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
