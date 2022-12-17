


const ModalDetails = ({ setModalDetails, fileFromTable }) => {

    const handleModalDetailsClose = () => {
        setModalDetails(false)
    }

    const handleCompleted = () => {

    }

    return (
        <>
            {/* <div className="ModalWrapper">
                <div className="Modal">
                    <div>
                        <p className="ModalHeader">Do you realy wanna delete file:</p >
                        <h2>{deletedItem.nameEmbroidery}</h2>
                        <div className="modalButtons">
                            <button onClick={handleConfrmDelete}>Confirm</button>
                            <button onClick={handleCancleDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div> */}
            <div>
                <form onSubmit={handleCompleted}>
                    <input type="number" placeholder="Uradjeno komada" >uradjeno</input>
                    <button type="submit" >Submit</button>
                </form>
                <button>Uradjeno Komada</button>
                <button onClick={handleModalDetailsClose} >Cancel</button>
            </div>
        </>
    )
}

export default ModalDetails