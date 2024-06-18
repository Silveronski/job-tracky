import React, { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
    text: string,
    imgUrl: string,
    linkTo: string,
    onClick?: MouseEventHandler<HTMLAnchorElement>
};

const NavItem: React.FC<NavItemProps> = ({ text, imgUrl, linkTo, onClick }) => {
    return (
        <li className="dropdown-menu-item">
            <img src={imgUrl} alt={text}/>
            <Link to={linkTo} onClick={onClick}>{text}</Link>
        </li>
    )
}

export default NavItem