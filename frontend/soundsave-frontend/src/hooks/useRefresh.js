import axios from "../api/axios.js";
import useAuth from "./useAuth.js";
import { errorMsg } from "../helper/errorMsg.js";

const useRefresh = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", { withCredentials: true });
      if (response.status === 200) {
        setAuth((prev) => {
          console.log(prev);
          console.log(response?.data?.accessToken);
          return { ...prev, accessToken: response?.data?.accessToken };
        });

        return response?.data?.accessToken;
      }
    } catch (error) {
      const err = errorMsg(error);
      throw new Error(err);
    }
  };

  return refresh;
};

export default useRefresh;
