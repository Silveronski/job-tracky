import PropTypes from 'prop-types';

const FormContainer = ({ children, extraContent = null, containerClass = '',  wrapperClass = '', wrapperStyle = null }) => {
    return (
        <section className={`form-container ${containerClass}`}>
            <div className={`wrapper ${wrapperClass}`} style={wrapperStyle}>
                {children}    
            </div>   
            {extraContent}                           
        </section>
    )
}

FormContainer.propTypes = {
    children: PropTypes.node.isRequired,
    extraContent: PropTypes.node,
    containerClass: PropTypes.string,
    wrapperClass: PropTypes.string,
    wrapperStyle: PropTypes.object,
};

export default FormContainer