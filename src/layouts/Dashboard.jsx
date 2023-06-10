import { FaBars } from "react-icons/fa";
import { Link, NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import Spinner from "../components/Spinner";
import ThemeToggler from "../components/ThemeToggler";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const Dashboard = () => {
  const { role, isLoading } = useUserRole();
  const { user, loading } = useAuth();

  if (isLoading || loading) return <Spinner />;

  return (
    <div className="drawer lg:drawer-open max-w-[100vw]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col w-[100vw] lg:w-[65vw] xl:w-[72vw] mx-auto">
        {/* Page content here */}
        <div className="navbar bg-base-300 lg:hidden justify-between">
          <Link to="/" className="shrink-0">
            <div className="w-10 h-10 rounded-full gradient-bg grid place-content-center">
              <div className="w-8 h-8 rounded-full bg-base-300 text-center font-bold text-2xl text-neutral">
                L
              </div>
            </div>
            <h2 className={`ml-2 text-2xl font-bold gradient-text`}>
              LensCraft
            </h2>
          </Link>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost hover:bg-inherit text-xl drawer-button"
          >
            <FaBars />
          </label>
        </div>

        <Outlet />
        <ScrollRestoration />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 w-80 h-full bg-base-300 text-base-content dashboard flex-nowrap overflow-auto">
          <div className="flex justify-between">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full gradient-bg grid place-content-center">
                <div className="w-8 h-8 rounded-full bg-base-300 text-center font-bold text-2xl text-neutral">
                  L
                </div>
              </div>
              <h2 className={`ml-2 text-2xl font-bold gradient-text`}>
                LensCraft
              </h2>
            </div>

            <ThemeToggler />
          </div>
          <div className="flex gap-3 p-4 mb-4 bg-neutral/10 rounded-md">
            <div className="mask mask-squircle w-8 h-8">
              <img src={user?.photoURL} />
            </div>
            <div>
              <h3 className="font-bold text-neutral">{user?.displayName}</h3>
              <p className="opacity-60 text-xs">{role}</p>
            </div>
          </div>
          {/* Sidebar content here */}
          {role === "student" && (
            <>
              <li>
                <NavLink to="/dashboard/my-enrolled-classes">
                  My Enrolled Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-selected-classes">
                  My Selected Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history">
                  Payment History
                </NavLink>
              </li>
            </>
          )}

          {role === "instructor" && (
            <>
              <li>
                <NavLink to="/dashboard/my-classes">My Classes</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-a-class">Add A Class</NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-classes">Manage Classes</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
              </li>
            </>
          )}

          <div className="divider" />

          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/instructors">Instructors</NavLink>
          </li>
          <li>
            <NavLink to="/classes">Classes</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
