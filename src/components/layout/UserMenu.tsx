import { FiChevronDown, FiLogOut, FiPlus, FiUser } from "react-icons/fi";
import { AiOutlineUnorderedList} from "react-icons/ai"
import useCurrentUser from "../hooks/useCurrentUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";

interface MenuItemProps {
  onClick: (() => void) | undefined;
  label: string;
  icon?: IconType
}

export const MenuItem = ({ onClick, label, icon: Icon }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="relative group hover:bg-gray-50 text-gray-600 hover:text-black flex gap-3 select-none items-center p-3 px-4  outline-none "
    >
      {Icon && <Icon className="group-hover:-rotate-12 duration-200 ease-out group-hover:scale-105" size={16} />}
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
        <div onClick={toggleOpen} className="  cursor-pointer border border-rose-400 bg-rose-50 hover:bg-rose-100  rounded-full  p-2.5 flex items-center gap-2 text-sm">
          <FiUser size={16} className={`duration-200 text-rose-500 ease-out`} />
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
            <MenuItem icon={AiOutlineUnorderedList} onClick={() => navigate("/dashboard")} label="My Recipes" />
            <MenuItem icon={FiLogOut} onClick={logout} label="Logout" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
