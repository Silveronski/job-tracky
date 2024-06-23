import React, { MouseEventHandler } from 'react';

interface NavItemProps {
    text: string,
    imgUrl: string,
    onClick?: MouseEventHandler<HTMLLIElement>
};

const NavItem: React.FC<NavItemProps> = ({ text, imgUrl, onClick }) => {
    return (
        <li className="dropdown-menu-item" onClick={onClick}>
            <img src={imgUrl} alt={text}/>
            <a>{text}</a>
        </li>
    )
}

export default NavItem