import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";

const MySelectedClasses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const secureAxios = useSecureAxios();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["selected-classes", user?.email],
    queryFn: async () => {
      const res = await secureAxios.get(`selected-classes/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You want to delete this class?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await secureAxios.delete(`selected-classes/${id}`);
        if (res.data?.deletedCount) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const handlePurchase = (item) => {
    navigate("/dashboard/payment", {
      state: item,
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="container my-12">
      <Helmet>
        <title>My Selected Classes | LensCraft</title>
      </Helmet>
      <Fade direction="up" cascade damping={0.2} triggerOnce>
        <h1 className="text-3xl font-bold gradient-text w-fit mx-auto mb-12">
          My Selected Classes
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-xl text-neutral text-center">
                <th className="bg-neutral/10 rounded-tl-lg"></th>
                <th className="bg-neutral/10">Class</th>
                <th className="bg-neutral/10">Price</th>
                <th className="bg-neutral/10">Available Seats</th>
                <th className="bg-neutral/10 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {data.map((item, i) => (
                <tr key={item._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-base">{item.name}</div>
                        <div className="text-sm opacity-50">
                          By {item.instructor?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-base text-center">$ {item.price}</td>
                  <td className="text-base text-center">
                    {item.availableSeats}
                  </td>
                  <th className="space-x-3">
                    <button
                      disabled={!item.availableSeats}
                      onClick={() => handlePurchase(item)}
                      className="btn btn-gradient !px-4 btn-xs"
                    >
                      Purchase
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-secondary btn-xs"
                    >
                      Delete
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

export default MySelectedClasses;
