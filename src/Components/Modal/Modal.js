import "./Modal.css"


const Modal = ({ modal, handleConfrmDelete, handleCancleDelete }) => {
    const { deletedItem } = modal

    return (
        <>

            <div className="ModalWrapper">
                <div className="Modal">
                    <div>
                        <h1>Do you realy wanna delete file</h1>
                        <h2>{deletedItem.nameEmbroidery}</h2>
                        <div className="modalButtons">
                            <button onClick={handleConfrmDelete}>Confirm</button>
                            <button onClick={handleCancleDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Modal