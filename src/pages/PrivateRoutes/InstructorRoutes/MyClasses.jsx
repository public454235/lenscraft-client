import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";

const MyClasses = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const { data: allClasses = [], isLoading } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () => {
      const res = await secureAxios.get(`all-classes/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;
  return (
    <div className="container my-12">
      <Helmet>
        <title>My Classes | LensCraft</title>
      </Helmet>
      <Fade direction="up" cascade damping={0.2} triggerOnce>
        <h1 className="text-3xl font-bold gradient-text w-fit mx-auto mb-12">
          My Classes
        </h1>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-base text-neutral text-center">
                <th className="bg-neutral/10 rounded-tl-lg"></th>
                <th className="bg-neutral/10">Class</th>
                <th className="bg-neutral/10">Price</th>
                <th className="bg-neutral/10">
                  Enrolled <br /> Students
                </th>
                <th className="bg-neutral/10">
                  Approve <br />
                  Status
                </th>
                <th className="bg-neutral/10 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {allClasses.map((item, i) => (
                <tr key={item._id} className="text-sm">
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">$ {item.price}</td>
                  <td className="text-center">{item.enrolledCount}</td>
                  <td className="text-center">
                    {item.status}
                    {item.status === "denied" && (
                      <>
                        <br />
                        <button
                          onClick={() =>
                            Swal.fire({
                              title: `Feedback of ${item.name} class`,
                              text: item.feedback || "no feedback yet",
                            })
                          }
                          className="btn btn-accent btn-xs"
                        >
                          See Feedback
                        </button>
                      </>
                    )}
                  </td>
                  <th className="text-center flex flex-col items-center space-y-2">
                    <button
                      disabled={item.status === "approved"}
                      className="btn btn-gradient w-24 btn-xs"
                    >
                      Update
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

export default MyClasses;
