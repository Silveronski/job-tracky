import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

const EditJob = () => {
    const location = useLocation();
    const { job } = location.state || {};
    const navigate = useNavigate();
    const [error, setError] = useState({msg: '', activated: false});

    useEffect(() => {
        !job && navigate("/login");
    }, [job, navigate]);

    return (
        <div>EditJob</div>
    )
}

export default EditJob