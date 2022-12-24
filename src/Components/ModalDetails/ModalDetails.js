import React, { useState, useEffect } from 'react'
import "./ModalDetails.css"

const ModalDetails = ({ setModalDetails, embroideryForm, setEmbroideryForm, funcToFindMessage }) => {
    const [numberDecrement, setNumberDecrement] = useState(0)
    const [numberDecrementInput, setNumberDecrementInput] = useState("")

    const handleModalDetailsClose = () => {
        setModalDetails(false)
    }





    const handleSubmitNumberDecrement = (e) => {
        e.preventDefault()
        setNumberDecrement((prev) => prev = +numberDecrementInput);
        setNumberDecrementInput("")

    }


    useEffect(() => {

        const newState = [...embroideryForm]
        funcToFindMessage(newState).numberOfEmbroidery -= 5
        setEmbroideryForm(newState)

        if (numberDecrement !== 0) {
            handleModalDetailsClose()
        }


    }, [numberDecrement]);





    return (


        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close-button">&times;</span>
                    <h2>Modal Title</h2>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmitNumberDecrement}>
                        <input type="number" className="modal-input" value={numberDecrementInput} onChange={(e) => setNumberDecrementInput(e.target.value)} />
                        <button type='submit' >Submit</button>
                    </form>
                </div>
                <div className="modal-footer">
                    <button onClick={handleModalDetailsClose} >Close</button>

                </div>
            </div>
        </div>

    )
}

export default ModalDetails