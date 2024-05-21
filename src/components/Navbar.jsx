import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserData, logout } from "../reducers/authReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserData({ email: localStorage.getItem("email") }));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const userData = useSelector((state) => state.auth.userData);

  return (
    <div className="text-white z-[1000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0">
            <h2 className="text-3xl font-bold">InterviewAI</h2>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link className="text-lg font-bold" to="/">
              Home
            </Link>
            <Link className="text-lg font-bold" to="/about">
              About Us
            </Link>
            {localStorage.getItem("jwt") ? (
              <div className="relative">
                <button className="peer flex items-center space-x-2 text-lg font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <p>{userData.firstName}</p>
                </button>
                <div className="hidden peer-hover:flex hover:flex flex-col absolute bg-white text-black drop-shadow-xl border-t-2 border-[#31cfe2] right-0 mt-2">
                  <button
                    className="px-5 py-3 hover:bg-gray-100 hover:font-bold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link className="text-lg font-bold flex items-center" to="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                Sign In
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 6.75h15M4.5 12h15m-15 5.25h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#19173d] text-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            className="text-lg font-bold block"
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="text-lg font-bold block"
            to="/about"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          {localStorage.getItem("jwt") ? (
            <div className="relative">
              <button className="peer flex items-center space-x-2 text-lg font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <p>{userData.firstName}</p>
              </button>
              <div className="hidden peer-hover:flex hover:flex flex-col absolute bg-white text-black drop-shadow-xl border-t-2 border-[#31cfe2] right-0 mt-2">
                <button
                  className="px-5 py-3 hover:bg-gray-100 hover:font-bold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              className="text-lg font-bold flex justify-center"
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Sign In
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
export default Navbar;
