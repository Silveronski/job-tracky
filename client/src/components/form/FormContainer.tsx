import React, { ReactNode } from "react"

interface FormContainerProps {
    children: ReactNode,
    extraContent?: ReactNode,
    containerClass?: string, 
    wrapperClass?: string
};

const FormContainer: React.FC<FormContainerProps> = ({ children, extraContent, containerClass, wrapperClass }) => {
    return (
        <section className={`form-container ${containerClass}`}>
            <div className={`wrapper ${wrapperClass}`}>
                {children}    
            </div>   
            {extraContent}                           
        </section>
    )
}

export default FormContainer