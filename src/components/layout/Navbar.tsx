import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import useCurrentUser from "../hooks/useCurrentUser";

const Navbar = () => {
  const {user}= useCurrentUser()

  return (
    <header className="px-4  sticky top-0 border-b backdrop-blur-lg">
      <nav className="flex h-14 sm:h-16 items-center justify-between container mx-auto">
        <Link
          to={"/"}
          className="font-bold text-lg sm:text-2xl hover:text-rose-500 duration-200 hover:scale-105 hover:-rotate-6 hover:translate-x-2"
        >
          Foodly
        </Link>
        <div className="flex gap-3 sm:gap-4 items-center">
          <Link
            to={"/recipes"}
            className="border text-sm sm:text-base focus:outline-none focus:ring focus:ring-gray-100 border-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-gray-600 hover:bg-rose-50 hover:border-rose-400 hover:text-rose-600 transition duration-200 ease-out  "
          >
            Explore Recipies 
          </Link>
          {!user ? (
            <Link
              to={"/login"}
              className="px-3 py-1.5 focus:outline-none focus:ring focus:ring-rose-200 text-sm sm:text-base sm:px-4 sm:py-2 bg-rose-500 active:bg-rose-600 hover:bg-rose-600 text-white rounded-xl"
            >
              Share your recipe
            </Link>
          ) : (
            <UserMenu/>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
