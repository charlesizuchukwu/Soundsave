import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useRouteProtect(token, setState) {
  const navigate = useNavigate();
  useEffect(() => {
    const protector = () => {
      console.log(token);
      if (typeof token === "undefined") {
        navigate("/login");
      } else {
        setState(true);
      }
    };

    protector();
  }, []);
}
