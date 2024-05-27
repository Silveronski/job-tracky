import PropTypes from 'prop-types';

const Button = ({ text, onClick = () => {}, className = 'primary-button' }) => {
  return (
    <button className={className} onClick={onClick}>{text}</button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button