import React from 'react';
import useAuthRedirect from '../hooks/useAuthRedirect';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Account: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = location.state || {};

    // useAuthRedirect(currentUser);

    return (
        <section>
            <div>
                <Button text='Update Profile Details'/>
                <Button text='Change Passsword'/>
                <Button text='Delete Account'/>
            </div>
        </section>
    )
}

export default Account