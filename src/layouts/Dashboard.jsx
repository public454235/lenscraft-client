import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 w-80 h-full bg-base-300 text-base-content dashboard">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full gradient-bg grid place-content-center">
              <div className="w-8 h-8 rounded-full bg-base-300 text-center font-bold text-2xl text-neutral">
                L
              </div>
            </div>
            <h2
              className={`ml-2 text-2xl font-bold hidden sm:block gradient-text`}
            >
              LensCraft
            </h2>
          </div>

          <div className="flex gap-3 px-2 mb-4">
            <div className="mask mask-squircle w-8 h-8">
              <img src={user?.photoURL} />
            </div>
            <div>
              <h3 className="font-bold text-neutral">{user?.displayName}</h3>
              <p className="opacity-60 text-xs">Student</p>
            </div>
          </div>
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
