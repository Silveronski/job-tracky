import PropTypes from 'prop-types';

const FormContainer = ({ children, extraContent = null, containerClass = '',  wrapperClass = ''}) => {
    return (
        <section className={`form-container ${containerClass}`}>
            <div className={`wrapper ${wrapperClass}`}>
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
};

export default FormContainer