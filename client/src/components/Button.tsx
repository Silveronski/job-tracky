import React from 'react';

interface ButtonProps {
  text: string;
  className?: string;
  imgUrl?: string;
  imgClass?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick = () => {}, className = 'primary-button', imgUrl = '', imgClass = '' }) => {
  return (
    <button className={className} onClick={onClick}>
      {text} {imgUrl && <img className={imgClass} src={imgUrl} alt="image"/>}
    </button>
  )
};

export default Button