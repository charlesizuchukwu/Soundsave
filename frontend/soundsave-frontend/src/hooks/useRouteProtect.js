import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

export default function useRouteProtect(token, setState) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  useEffect(() => {
    const protector = async () => {
      try {
        console.log(token);

        if (token) {
          console.log(token);
          setState(true);
        }

        if (typeof token == "undefined") {
          const response = await axios.get("/getToken");
          console.log(response);

          if (response.status === 200) {
            console.log(response?.data?.tokenStatus);
            setState(true);
          }

          console.log(auth.accessTokwn);
        }
      } catch (error) {
        console.log(error);
        setState(false);
      }
    };

    protector();
  }, []);
}
