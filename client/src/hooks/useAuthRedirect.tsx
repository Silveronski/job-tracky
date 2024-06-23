import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate, Location } from "react-router-dom";

type UseAuthRedirectProps = (locationObject?: Location | null, navLink?: string) => void;

const useAuthRedirect: UseAuthRedirectProps = (locationObject, navLink) => {
    const { user, loading } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && (locationObject?.state === "" || !locationObject)) {        
            user?.token ? navigate(navLink || "/dashboard") : navigate("/login"); 
        }
    },[locationObject, user, loading]);
};

export default useAuthRedirect