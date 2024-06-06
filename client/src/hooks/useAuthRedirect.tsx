import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Location } from "react-router-dom";

const locationDefaultState: Location = {
    state:"",
    key:"", 
    pathname:"",
    search:"",
    hash:""
};

const useAuthRedirect = (locationObject: Location = locationDefaultState) => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && locationObject.state === "") {
            user?.token ? navigate("/dashboard") : navigate("/login");
        }
    },[locationObject, navigate, user, loading]);
}

export default useAuthRedirect