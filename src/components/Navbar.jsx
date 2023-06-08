import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import ThemeToggler from "./ThemeToggler";

const NavItems = () => {
  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/instructors">Instructors</NavLink>
      </li>
      <li>
        <NavLink to="/classes">Classes</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );
};

const Navbar = () => {
  const { theme } = useTheme();
  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success!",
          text: "Log out successful",
          timer: 2000,
        });
      })
      .catch((err) => console.error(err));
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-sm">
      <div className="drawer z-20">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full bg-base-300">
            <div className="container navbar justify-between">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-full gradient-bg grid place-content-center">
                  <div className="w-8 h-8 rounded-full bg-base-300 text-center font-bold text-2xl text-neutral">
                    L
                  </div>
                </div>
                <h2
                  className={`ml-2 text-2xl font-bold hidden sm:block ${
                    theme === "dark" ? "text-white" : "gradient-text"
                  }`}
                >
                  LensCraft
                </h2>
              </div>
              <div className="flex-1 hidden lg:block text-center">
                <ul className="menu menu-horizontal text-base">
                  {/* Navbar menu content here */}
                  <NavItems />
                </ul>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                {user ? (
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar mt-0.5"
                    >
                      <div className="w-10 rounded-full">
                        <img src={user?.photoURL} />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="mt-3 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a className="hover:!bg-neutral/10">
                          {user?.displayName}
                        </a>
                      </li>
                      <li onClick={handleLogout}>
                        <a className="hover:!bg-neutral/10">Logout</a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-gradient rounded-full min-h-fit h-10"
                  >
                    Login
                  </Link>
                )}
                <ThemeToggler />
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-3"
                    className="btn btn-square btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-6 h-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base">
            {/* Sidebar content here */}
            <NavItems />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
