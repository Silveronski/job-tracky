import React from 'react';
import Button from './Button';

interface ModalDialog {
    dialogRef: React.LegacyRef<HTMLDialogElement>,
    imgUrl: string,
    header: string,
    subHeader: string,
    btnText: string,
    btnOnClick: () => void
};

const ModalDialog: React.FC<ModalDialog> = ({ dialogRef, imgUrl, header, subHeader, btnText, btnOnClick }) => {
    return (
        <dialog ref={dialogRef}>
            <img className="dialog-item" src={imgUrl}/>
            <h2 className="dialog-item">{header}</h2>
            <p className="dialog-item">{subHeader}</p>
            <Button text={btnText} onClick={btnOnClick}/>
        </dialog>    
    )
}

export default ModalDialog