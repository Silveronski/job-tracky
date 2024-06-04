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

export default FormContainer