import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "./useAuth";

const useSecureAxios = () => {
  const { logoutUser } = useAuth();
  const instance = axios.create({
    baseURL: "http://localhost:5000/api/",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      instance.interceptors.request.use((config) => {
        config.headers.authorization = token;
        return config;
      });

      instance.interceptors.response.use(
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
  }, [instance, logoutUser]);
  return instance;
};

export default useSecureAxios;
