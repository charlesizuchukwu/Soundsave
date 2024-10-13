import useAuth from "./useAuth";
import useRefresh from "./useRefresh";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import axios from "../api/axios";

const useAxiosPrivate = () => {
  const refresh = useRefresh();
  const { auth, setAuth } = useAuth();
  const [pageRefreshToken, setPageRefreshToken] = useState();

  console.log(auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getToken");
        console.log(response);
        if (response.status === 200) {
          setAuth((prev) => ({ ...prev, accessToken: response?.data?.token }));

          setPageRefreshToken(response?.data?.token);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(pageRefreshToken);
  console.log(auth.accessToken);

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log(config);
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        console.log(config);

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log(prevRequest);
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log(newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
