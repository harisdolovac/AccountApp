import React, { useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom';
import ImageUpload from '../../Components/ImageUpload/ImageUpload';
import "./Details.css"

const Detalis = ({ embroideryForm }) => {



    const [textDetails, setTextDetails] = useState("")
    const [FormDetails, setFormDetails] = useState([])

    const handleDetails = (e) => {
        setTextDetails(e.target.value)
    }

    const handleDetailsForm = (e) => {
        e.preventDefault()
        setFormDetails((prev) => [...prev, textDetails])
        setTextDetails("")
    }

    const location = useLocation();
    const fileFromTable = location.state.embroideryForm

    const { id } = useParams();
    const detailsMap = fileFromTable.filter((item) => item.id === +id)
    return (
        <>
            <button><Link to="/" >Home</Link ></button>
            <div className='details'>
                <div className="detailsWrapper">
                    <div className="leftDetails">
                        <div className="leftSide">Ime Veza: {detailsMap[0].nameEmbroidery}</div>
                        <div className="leftSide">Broj komada: {detailsMap[0].numberOfEmbroidery}</div>
                        <div className="leftSide">Cena: {detailsMap[0].price}</div>
                        <p>Napomena:</p>
                        {
                            FormDetails.map((text, i) => <p key={i} >{text}</p>)
                        }

                        <form onSubmit={handleDetailsForm}>
                            <textarea type="text" value={textDetails} className='inputDetails' onChange={(e) => handleDetails(e)} />
                            <button type='submit'>Submit</button>
                        </form>
                        <button type='submit'>Uradjeno</button>
                    </div>

                    <div className="rightDetails">

                        <div className="rightSide">slikA</div>
                        <ImageUpload />
                    </div>
                </div>

            </div>
        </>

    )
}

export default Detalis