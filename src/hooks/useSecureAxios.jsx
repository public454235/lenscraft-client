import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "./useAuth";

const useSecureAxios = () => {
  const { logoutUser } = useAuth();
  const secureAxios = axios.create({
    baseURL: "https://lenscarft-sam.vercel.app/api/",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      secureAxios.interceptors.request.use((config) => {
        config.headers.authorization = token;
        return config;
      });

      secureAxios.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
          ) {
            await logoutUser().then(() =>
              Swal.fire({
                icon: "error",
                title: "Unauthorized user",
                text: "Please login again",
              })
            );
            return Promise.reject(error);
          }
        }
      );
    }
  }, [secureAxios, logoutUser]);
  return secureAxios;
};

export default useSecureAxios;
