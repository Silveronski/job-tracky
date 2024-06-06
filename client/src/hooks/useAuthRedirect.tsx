import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Location } from "react-router-dom";

const useAuthRedirect = (locationObject: Location | boolean = true) => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!locationObject) user?.token ? navigate("/dashboard") : navigate("/login");
            else !user.token && navigate("/login"); 
        }
    },[locationObject, navigate, user, loading]);
}

export default useAuthRedirect