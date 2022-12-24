import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import ImageUpload from '../../Components/ImageUpload/ImageUpload';
import ModalDetails from '../../Components/ModalDetails/ModalDetails';
import "./Details.css"

const { v4: uuidv4 } = require('uuid');

const Detalis = ({ embroideryForm, setEmbroideryForm, embroideryNames }) => {



    const [textDetails, setTextDetails] = useState("")
    const [FormDetails, setFormDetails] = useState([])
    const [modalDetails, setModalDetails] = useState(false)

    const handleDetails = (e) => {
        setTextDetails(e.target.value)
    }



    console.log("Adsa", embroideryForm);
    const { id } = useParams();





    let indexOfUser = embroideryForm.findIndex((item) => Object.keys(item).join("") === embroideryNames.selectCompany)
    const funcToFindMessage = (form) => {
        return form[indexOfUser][embroideryNames.selectCompany].find((item) => item.id === id)
    }


    console.log(funcToFindMessage(embroideryForm));

    const handleDetailsForm = (e) => {
        e.preventDefault()
        const newState = [...embroideryForm]
        funcToFindMessage(newState)["message"].push(textDetails)
        setEmbroideryForm(newState)
        setTextDetails("")
        return newState
    }

    console.log(embroideryForm);

    const handleModalDetails = () => {
        setModalDetails(true)
    }
    const navigate = useNavigate();


    return (
        <>
            {!modalDetails ? (
                <>
                    <button onClick={() => navigate("/")} >Home</button>
                    <div className='details'>
                        <div className="detailsWrapper">
                            <div className="leftDetails">
                                <div className="leftSide">Ime Veza: {funcToFindMessage(embroideryForm).nameEmbroidery}</div>
                                <div className="leftSide">Broj komada: {funcToFindMessage(embroideryForm).numberOfEmbroidery}</div>
                                <div className="leftSide">Cena: {funcToFindMessage(embroideryForm).price}</div>
                                <p>Napomena:</p>
                                {
                                    funcToFindMessage(embroideryForm)["message"].map((text, i) => <p key={uuidv4()} >{text}</p>)
                                }

                                <form onSubmit={(e) => handleDetailsForm(e)}>
                                    <textarea type="text" value={textDetails} className='inputDetails' onChange={(e) => handleDetails(e)} />
                                    <button type='submit'>Submit</button>
                                </form>
                                <button type='submit' onClick={handleModalDetails} >Uradjeno</button>
                            </div>

                            <div className="rightDetails">
                                <div className="rightSide">slikA</div>
                                <ImageUpload />
                            </div>
                        </div>

                    </div>
                </>) : (<ModalDetails setModalDetails={setModalDetails} setEmbroideryForm={setEmbroideryForm} embroideryForm={embroideryForm} indexOfUser={indexOfUser} embroideryNames={embroideryNames} funcToFindMessage={funcToFindMessage} />)
            }
        </>

    )
}

export default Detalis