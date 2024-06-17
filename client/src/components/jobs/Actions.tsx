import { useJobContext } from '../../context/JobContext';
import { exportJobsToExcel } from '../../utils/exportJobsToExcel'
import React from 'react'
import Button from '../ui/Button'
import excel from "../../assets/images/excel.png";

const Actions: React.FC= () => {
    const { jobs } = useJobContext();
    return (
        <section className="actions-container">
            <Button 
                text="Export to excel"
                onClick={() => exportJobsToExcel(jobs)}
                className="secondary-button"
                imgUrl={excel}
                imgClass="excel-img"
            />    
        </section>
    )
}

export default Actions