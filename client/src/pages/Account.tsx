import React from 'react';
import useAuthRedirect from '../hooks/useAuthRedirect';
import Button from '../components/ui/Button';
import changePassword from '../assets/images/changePassword.png';
import updateUser from '../assets/images/updateUser.png';
import deleteAccount from '../assets/images/delete-account.png';
import dashboard from '../assets/images/dashboard.png';
import { useNavigate } from 'react-router-dom';

const Account: React.FC = () => {
    const navigate = useNavigate();

    useAuthRedirect(null, "/account");

    return (
        <section className='account-container'>
            <h1>Account</h1>
            <div className='account-wrapper'>
                <div className='account-btn-container'>
                    <Button text='Update Profile Details' imgUrl={updateUser}/>
                    <Button text='Change Passsword' imgUrl={changePassword}/>
                    <Button text='Delete Account' imgUrl={deleteAccount}/>
                    <Button text='Back to Dashboard' imgUrl={dashboard} onClick={() => navigate("/dashboard")}/>
                </div>
            </div>          
        </section>
    )
}

export default Account