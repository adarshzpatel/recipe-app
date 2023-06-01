import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import useCurrentUser from "../hooks/useCurrentUser";

const Navbar = () => {
  const { user, loading } = useCurrentUser()

  return (
  <header className="px-4 z-50  sticky top-0 border-b backdrop-blur-lg">
      <nav className="flex h-14 sm:h-16 items-center justify-between container mx-auto max-w-screen-lg ">
        <Link
          to={"/"}
          className="font-bold text-lg sm:text-xl duration-200  hover:-rotate-3  p-2 px-4 rounded-tl-2xl rounded-br-2xl hover:rounded-tr-2xl  text-rose-500"
        >
         🥘 RecipeVerse
        </Link>
        <div className="flex gap-3 sm:gap-4 items-center">
          <Link
            to={"/recipes"}
            className="text-sm sm:text-base focus:outline-none hover:ring-rose-300 hover:ring-1 focus:ring-1 focus:ring-rose-300 focus:bg-rose-50 focus:text-rose-500 border-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-gray-600 hover:bg-rose-50 hover:border-rose-400 hover:text-rose-600 transition duration-200 ease-out   "
          >
            Explore Recipies
          </Link>
          {!user ? (
            <Link
              to={"/login"}
              className="px-3 py-1.5 focus:outline-none focus:ring focus:ring-gray-200 text-sm sm:text-base sm:px-4 sm:py-2 bg-gray-900 hover:bg-rose-500 duration-200 ease-outP text-white rounded-full"
            >
              Share your recipe
            </Link>
          ) : (
            <UserMenu />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
