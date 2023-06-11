import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";
import useSecureAxios from "../../../hooks/useSecureAxios";

const ManageUsers = () => {
  const secureAxios = useSecureAxios();
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await secureAxios.get("users");
      return res.data;
    },
  });

  const changeUserRole = async (id, role) => {
    const res = await secureAxios.patch(`users/${id}`, { role });
    if (res.data?.modifiedCount === 1) {
      refetch();
      Swal.fire({
        icon: "success",
        title: `User role changed to ${role}`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  if (isLoading) return <Spinner />;
  return (
    <div className="container my-12">
      <Helmet>
        <title>Manage Users | LensCraft</title>
      </Helmet>
      <Fade direction="up" cascade damping={0.2} triggerOnce>
        <h1 className="text-3xl font-bold gradient-text w-fit mx-auto mb-12">
          Manage Users
        </h1>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-base text-neutral text-center">
                <th className="bg-neutral/10 rounded-tl-lg"></th>
                <th className="bg-neutral/10">Image</th>
                <th className="bg-neutral/10">Name</th>
                <th className="bg-neutral/10">Email</th>
                <th className="bg-neutral/10">Role</th>
                <th className="bg-neutral/10 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {allUsers.map((user, i) => (
                <tr key={user._id} className="text-sm">
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img src={user.photoURL} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <h3 className="text-base">{user.name}</h3>
                  </td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.role || "student"}</td>
                  <th className="text-center flex flex-col items-center space-y-2">
                    <button
                      disabled={user.role === "instructor"}
                      onClick={() => changeUserRole(user._id, "instructor")}
                      className="btn btn-primary w-40 btn-xs"
                    >
                      Make Instructor
                    </button>
                    <button
                      disabled={user.role === "admin"}
                      onClick={() => changeUserRole(user._id, "admin")}
                      className="btn btn-secondary w-40 btn-xs"
                    >
                      Make Admin
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fade>
    </div>
  );
};

export default ManageUsers;
