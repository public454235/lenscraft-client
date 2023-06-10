import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useSecureAxios from "../hooks/useSecureAxios";
import useTheme from "../hooks/useTheme";
import useUserRole from "../hooks/useUserRole";

const ClassCard = ({ content }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { role } = useUserRole();
  const { _id, name, image, price, instructor, seats, enrolledCount } = content;
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const availableSeats = seats - enrolledCount;

  const secureAxios = useSecureAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectClass = async () => {
    setLoading(true);
    try {
      if (!user) {
        Swal.fire({
          icon: "warning",
          title: "Failed!",
          text: "Please login first to select a class",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login", {
              state: location,
            });
          }
        });
      }
      const res = await secureAxios.post("selected-classes", {
        classId: _id,
        name,
        image,
        price,
        instructor,
        email: user.email,
      });

      if (res.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: res.data.message,
          timer: 2000,
          position: "top-end",
        });
      }

      if (res.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `${name} is added to your selected classes`,
          timer: 2000,
          position: "top-end",
        });
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade direction="up" delay={400} triggerOnce>
      <div
        className={`w-full rounded-md overflow-hidden ${
          availableSeats
            ? "bg-base-200"
            : theme === "dark"
            ? "bg-red-950"
            : "bg-red-100"
        }`}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <div className="relative w-full aspect-[1.4/1] overflow-hidden">
          <img
            src={image}
            alt=""
            className={`w-full h-full object-cover object-center duration-700 ${
              hovered ? "scale-125" : "scale-100"
            }`}
          />
          <div className="py-3 px-5 bg-base-200/90 rounded-s-2xl absolute top-3 right-0 z-20">
            <h3 className="font-semibold gradient-text">$ {price}</h3>
          </div>
          <div
            className={`absolute bottom-0 left-0 w-full bg-base-200/70 z-10 duration-300 text-center grid place-content-center overflow-hidden ${
              hovered ? "h-[100%]" : "h-[0%]"
            }`}
          >
            <div
              className={`duration-200 delay-100 ease-in-out ${
                hovered ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div
                className={`w-fit py-2 px-4 rounded-full mb-4 ${
                  availableSeats ? "bg-base-200/90" : "bg-red-500"
                }`}
              >
                <p className="font-semibold text-lg text-neutral">
                  {availableSeats
                    ? `Available Seats: ${availableSeats}`
                    : "No seats available"}
                </p>
              </div>
              <button
                onClick={handleSelectClass}
                disabled={
                  !availableSeats || role === "admin" || role === "instructor"
                }
                className="btn btn-gradient border-none rounded-full normal-case disabled:opacity-0"
              >
                {loading ? (
                  <span className="loading loading-spinner" />
                ) : (
                  "Select this class"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-neutral text-xl font-bold mb-2">{name}</h2>
          <p>Instructor: {instructor?.name}</p>
        </div>
      </div>
    </Fade>
  );
};

export default ClassCard;
