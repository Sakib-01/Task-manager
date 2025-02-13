// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useEffect } from "react";
import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.log("error caught---> ", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          logOut();
          navigate("/login");
        }
      }
    );
  }, [logOut, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
