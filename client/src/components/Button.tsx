import PropTypes from 'prop-types';

const Button = ({ text, onClick = () => {}, className = 'primary-button', imgUrl = '', imgClass = '' }) => {
  return (
    <button className={className} onClick={onClick}>{text} {imgUrl && <img className={imgClass} src={imgUrl} alt="image"/>}</button>
  )
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  imgUrl: PropTypes.string,
  imgClass: PropTypes.string
};

export default Button