import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = false;

  return (
    <header className="p-4">
      <nav className="flex items-center justify-between container mx-auto">
        <Link
          to={"/"}
          className="font-bold text-2xl hover:text-rose-500 duration-200 hover:scale-105 hover:-rotate-6 hover:translate-x-2"
        >
          Foodly
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            to={"/explore"}
            className="border border-gray-300 px-4 py-2 rounded-xl text-gray-600 hover:bg-rose-50 hover:border-rose-400 hover:text-rose-600 transition duration-200 ease-out  "
          >
            Explore Recipies
          </Link>
          {!isLoggedIn ? (
            <Link
              to={"/login"}
              className="bg-rose-500 active:bg-rose-600 hover:bg-rose-600 text-white px-4 py-2 rounded-xl"
            >
              Share your recipe
            </Link>
          ) : (
            <div>User Menu here</div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
