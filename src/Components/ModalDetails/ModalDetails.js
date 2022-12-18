import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "./ModalDetails.css"

const ModalDetails = ({ setModalDetails, embroideryForm, setEmbroideryForm }) => {
    const [numberDecrement, setNumberDecrement] = useState(0)
    const [numberDecrementInput, setNumberDecrementInput] = useState("")

    const handleModalDetailsClose = () => {
        setModalDetails(false)
    }



    const { id } = useParams();
    console.log(id);






    const handleSubmitNumberDecrement = (e) => {
        e.preventDefault()
        setNumberDecrement((prev) => prev = +numberDecrementInput);
        setNumberDecrementInput("")

    }

    useEffect(() => {

        setEmbroideryForm((prevForm) =>
            prevForm.map((item) => {
                if (item.id === +id) {
                    return {
                        ...item,
                        numberOfEmbroidery: item.numberOfEmbroidery - numberDecrement,
                    };
                }
                return item;
            })
        );
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