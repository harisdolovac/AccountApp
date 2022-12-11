import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import "./Details.css"

const Detalis = ({ embroideryForm }) => {

    const [textDetails, setTextDetails] = useState("")

    const handleDetails = (e) => {
        setTextDetails(e.target.value)
    }

    const location = useLocation();
    const fileFromTable = location.state.embroideryForm

    const { id } = useParams();
    const detailsMap = fileFromTable.filter((item) => item.id === +id)
    return (
        <div className='details'>
            <div className="detailsWrapper">
                <div class="leftDetails">

                    <div className="leftSide">Ime Veza: {detailsMap[0].nameEmbroidery}</div>
                    <div className="leftSide">Broj komada: {detailsMap[0].numberOfEmbroidery}</div>
                    <div className="leftSide">Cena: {detailsMap[0].price}</div>
                    <p>Napomena:</p>
                    <p>{textDetails}</p>
                    <textarea type="text" className='inputDetails' onChange={(e) => handleDetails(e)} />
                </div>
                <div class="rightDetails">

                    <div className="rightSide">slikA</div>
                </div>
            </div>

        </div>
    )
}

export default Detalis