import React from 'react';
import useAuthRedirect from '../hooks/useAuthRedirect';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = location.state || {};

    useAuthRedirect(currentUser);

    return (
        <section>Profile</section>
    )
}

export default Profile