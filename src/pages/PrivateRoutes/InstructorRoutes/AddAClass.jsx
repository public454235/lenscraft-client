import axios from "axios";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";

const AddAClass = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const secureAxios = useSecureAxios();
  const navigate = useNavigate();
  const imgbbUrl = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_image_hosting_key
  }`;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addClass = async (data) => {
    try {
      setLoading(true);
      const { name, image, seats, price } = data;
      if (!image[0].type.includes("image"))
        throw new Error("Please input valid image");
      const formData = new FormData();
      formData.append("image", image[0]);
      const imgbbResult = await axios.post(imgbbUrl, formData);

      if (imgbbResult.data?.data?.display_url) {
        const image = imgbbResult.data.data.display_url;
        console.log(image);
        const res = await secureAxios.post("all-classes", {
          name,
          image,
          price,
          seats,
          instructor: {
            name: user.displayName,
            email: user?.email,
          },
        });

        if (res.data?.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Class added successfully",
            timer: 2000,
            showConfirmButton: false,
          });
          reset();
          navigate("/dashboard/my-classes");
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-12">
      <Helmet>
        <title>Add A Class | LensCraft</title>
      </Helmet>
      <Fade direction="up" cascade damping={0.2} triggerOnce>
        <h1 className="text-3xl font-bold gradient-text w-fit mx-auto mb-12">
          Add A Class
        </h1>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(addClass)} className="">
            {/* class name */}
            <div className="form-control mb-4">
              <label className="label" htmlFor="name">
                <span className="label-text text-base">Class Name</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="class name"
                className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm p-1">
                  Class Name is required
                </span>
              )}
            </div>
            {/* class image */}
            <div className="form-control mb-4">
              <label className="label" htmlFor="image">
                <span className="label-text text-base">Class Image</span>
              </label>
              <input
                type="file"
                id="image"
                className="file-input border-2 file-input-bordered w-full focus:outline-none"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <span className="text-red-500 text-sm p-1">
                  Class Image is required
                </span>
              )}
            </div>
            {/* Instructor name */}
            <div className="form-control mb-4">
              <label className="label" htmlFor="instructorName">
                <span className="label-text text-base">Instructor Name</span>
              </label>
              <input
                type="text"
                id="instructorName"
                placeholder="instructor name"
                className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary"
                defaultValue={user?.displayName}
                readOnly
              />
            </div>
            {/* Instructor email */}
            <div className="form-control mb-4">
              <label className="label" htmlFor="instructorEmail">
                <span className="label-text text-base">Instructor Email</span>
              </label>
              <input
                type="text"
                id="instructorEmail"
                placeholder="instructor email"
                className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary"
                defaultValue={user?.email}
                readOnly
              />
            </div>
            {/* available seats */}
            <div className="form-control mb-4">
              <label className="label" htmlFor="seats">
                <span className="label-text text-base">Available Seats</span>
              </label>
              <input
                type="text"
                id="seats"
                placeholder="available seats"
                className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary"
                {...register("seats", { required: true })}
              />
              {errors.seats && (
                <span className="text-red-500 text-sm p-1">
                  Available Seats is required
                </span>
              )}
            </div>
            {/* price */}
            <div className="form-control mb-4">
              <label className="label" htmlFor="price">
                <span className="label-text text-base">Price</span>
              </label>
              <input
                type="text"
                id="price"
                placeholder="price"
                className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="text-red-500 text-sm p-1">
                  Price is required
                </span>
              )}
            </div>

            {/* add class button */}
            <div className="form-control mb-6">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-gradient md:btn-lg normal-case md:text-xl disabled:text-white"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Add Class"
                )}
              </button>
            </div>
          </form>
        </div>
      </Fade>
    </div>
  );
};

export default AddAClass;
