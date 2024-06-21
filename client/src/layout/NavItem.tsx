import React, { MouseEventHandler } from 'react';

interface NavItemProps {
    text: string,
    imgUrl: string,
    onClick?: MouseEventHandler<HTMLAnchorElement>
};

const NavItem: React.FC<NavItemProps> = ({ text, imgUrl, onClick }) => {
    return (
        <li className="dropdown-menu-item">
            <img src={imgUrl} alt={text}/>
            <a onClick={onClick}>{text}</a>
        </li>
    )
}

export default NavItem