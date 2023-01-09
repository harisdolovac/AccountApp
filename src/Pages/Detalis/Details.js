import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Components/Firebase/firebaseConfig"
import { v4 as uuidv4 } from 'uuid';
import ImageUpload from '../../Components/ImageUpload/ImageUpload';
import ModalDetails from '../../Components/ModalDetails/ModalDetails';
import "./Details.css"


const Detalis = () => {



    const [textDetails, setTextDetails] = useState("")
    const [FormDetails, setFormDetails] = useState([])
    const [modalDetails, setModalDetails] = useState(false)
    const handleDetails = (e) => {
        setTextDetails(e.target.value)
    }



    const { id } = useParams();
    const location = useLocation()

    const conpmaniesData = location.state[0]?.data
    const selectCompany = location.state[1]?.data2

    const detailsEmbroideryForm = conpmaniesData?.find(item => item.id === id)


    const handleDetailsForm = (e) => {
        e.preventDefault()
        setFormDetails(prev => [...prev, textDetails])






        setTextDetails("")
    }

    useEffect(() => {

        let newArr = detailsEmbroideryForm.message.concat(FormDetails)
        if (FormDetails.length) {
            const pathData = `Companies/${selectCompany}/orders/${id}`
            const docRef = doc(db, pathData)

            setDoc(docRef, { message: newArr }, { merge: true })
        }

    }, [FormDetails])


    const handleModalDetails = () => {
        setModalDetails(true)
    }
    const navigate = useNavigate();


    return (
        <>
            {!modalDetails ? (
                <>
                    <button onClick={() => navigate(-1)} >Home</button>
                    <div className='details'>
                        <div className="detailsWrapper">
                            <div className="leftDetails">
                                <div className="leftSide">Ime Veza: {detailsEmbroideryForm.nameEmbroidery}</div>
                                <div className="leftSide">Broj komada: {detailsEmbroideryForm.numberOfEmbroidery} / {detailsEmbroideryForm.numberOfEmbroideryCompleted} </div>
                                <div className="leftSide">Cena: {detailsEmbroideryForm.price} </div>
                                <p>Napomena:</p>
                                {
                                    detailsEmbroideryForm["message"].map((item) => <p key={uuidv4()} >{item}</p>)
                                }

                                <form onSubmit={(e) => handleDetailsForm(e)}>
                                    <textarea type="text" value={textDetails} className='inputDetails' onChange={(e) => handleDetails(e)} />
                                    <button type='submit'>Submit</button>
                                </form>
                                <button type='submit' onClick={handleModalDetails} >Uradjeno</button>
                            </div>

                            <div className="rightDetails">
                                <div className="rightSide">slikA</div>
                                <ImageUpload id={id} detailsEmbroideryForm={detailsEmbroideryForm} selectCompany={selectCompany} />
                            </div>
                        </div>

                    </div>
                </>) : (
                <ModalDetails setModalDetails={setModalDetails} detailsEmbroideryForm={detailsEmbroideryForm} selectCompany={selectCompany} id={id} />


            )
            }
        </>

    )
}

export default Detalis