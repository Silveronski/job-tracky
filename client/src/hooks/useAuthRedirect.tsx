import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate, Location } from "react-router-dom";

const locationDefaultState: Location = {
    state:"",
    key:"", 
    pathname:"",
    search:"",
    hash:""
};

const useAuthRedirect = (locationObject: Location = locationDefaultState) => {
    const { user, loading } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && locationObject?.state === "") {
            user?.token ? navigate("/dashboard") : navigate("/login");
        }
    },[locationObject, navigate, user, loading]);
};

export default useAuthRedirect