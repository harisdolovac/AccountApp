import React, { useState } from 'react'
import "./ModalDetails.css"

import { v4 as uuidv4 } from 'uuid';


import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig"

const ModalDetails = ({ setModalDetails, detailsEmbroideryForm, selectCompany, id }) => {
    const [numberDecrementInput, setNumberDecrementInput] = useState(0)

    const handleModalDetailsClose = () => {
        setModalDetails(false)
    }




    const handleSubmitNumberDecrement = (e) => {
        e.preventDefault()

        const pathData = `Companies/${selectCompany}/orders/${id}`
        const docRef = doc(db, pathData)
        let newId = uuidv4()
        const pathDataCompleted = `Companies/${selectCompany}/completed/${newId}`
        const docRefCompleted = doc(db, pathDataCompleted)



        let numberCompletedEmb = { numberOfEmbroideryCompleted: detailsEmbroideryForm.numberOfEmbroideryCompleted -= numberDecrementInput }

        setDoc(docRef, numberCompletedEmb, { merge: true })

        setDoc(docRefCompleted, {
            nameEmbroidery: detailsEmbroideryForm.nameEmbroidery,
            numberOfEmbroidery: +numberDecrementInput,
            price: detailsEmbroideryForm.price,
            message: detailsEmbroideryForm.message,
            id: newId,
            date: new Date().toLocaleDateString(),
            dateSecounds: Math.round(Date.now() / 1000),
        }
        )
        handleModalDetailsClose()
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close-button">&times;</span>
                    <h2>Modal Title</h2>
                </div>
                <div className="modal-body">
                    <form onSubmit={(e) => handleSubmitNumberDecrement(e)}>
                        <input type="number" className="modal-input" value={numberDecrementInput} onChange={(e) => setNumberDecrementInput(+e.target.value)} />
                        <button type='submit' >Submit</button>
                    </form>
                </div>
                <div className="modal-footer">
                    <button onClick={() => handleModalDetailsClose()} >Close</button>

                </div>
            </div>
        </div >

    )
}

export default ModalDetails