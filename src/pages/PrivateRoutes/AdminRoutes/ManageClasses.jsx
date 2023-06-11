import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";
import useSecureAxios from "../../../hooks/useSecureAxios";

const ManageClasses = () => {
  const secureAxios = useSecureAxios();
  const {
    data: allClasses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () => {
      const res = await secureAxios.get("all-classes");
      return res.data;
    },
  });

  const handleApprove = async (id, action) => {
    try {
      const res = await secureAxios.patch(`classes/${id}`, { action });
      if (res.data?.modifiedCount === 1) {
        refetch();
        Swal.fire({
          icon: "success",
          title:
            action === "approved" ? "Class is approved" : "Class is denied",
          timer: 2000,
          showConfirmButton: false,
        });
      } else throw new Error("Something wrong!");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error.message,
      });
    }
  };

  const handleFeedback = (item) => {
    Swal.fire({
      title: `Feedback`,
      text: `Write reason for accept or deny ${item.name} class`,
      input: "text",
      inputValue: item.feedback ? item.feedback : "",
      confirmButtonText: "Submit",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.value.trim()) {
        const res = await secureAxios.patch(
          `classes/add-feedback/${item._id}`,
          { feedback: result.value }
        );
        if (res.data?.modifiedCount === 1) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Done!",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  if (isLoading) return <Spinner />;
  return (
    <div className="container my-12">
      <Helmet>
        <title>Manage Classes | LensCraft</title>
      </Helmet>
      <Fade direction="up" cascade damping={0.2} triggerOnce>
        <h1 className="text-3xl font-bold gradient-text w-fit mx-auto mb-12">
          Manage Classes
        </h1>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-base text-neutral text-center">
                <th className="bg-neutral/10 rounded-tl-lg"></th>
                <th className="bg-neutral/10">Class</th>
                <th className="bg-neutral/10">Instructor</th>
                <th className="bg-neutral/10">
                  Available <br /> Seats
                </th>
                <th className="bg-neutral/10">Price</th>
                <th className="bg-neutral/10">Status</th>
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
                  <td className="text-center">
                    <h3 className="text-base">{item.instructor.name}</h3>
                    <p className="text-xs">{item.instructor.email}</p>
                  </td>
                  <td className="text-center">
                    {item.seats - item.enrolledCount}
                  </td>
                  <td className="text-center">$ {item.price}</td>
                  <td className="text-center">{item.status}</td>
                  <th className="text-center flex flex-col items-center space-y-2">
                    <button
                      onClick={() => handleApprove(item._id, "approved")}
                      disabled={
                        item.status === "approved" || item.status === "denied"
                      }
                      className="btn btn-primary w-24 btn-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApprove(item._id, "denied")}
                      disabled={
                        item.status === "approved" || item.status === "denied"
                      }
                      className="btn btn-secondary w-24 btn-xs"
                    >
                      Deny
                    </button>
                    <button
                      onClick={() => handleFeedback(item)}
                      className="btn btn-accent w-24 btn-xs"
                    >
                      Feedback
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

export default ManageClasses;
