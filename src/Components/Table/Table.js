import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Table.css"

const Table = ({ embroideryForm, handleEdit, handleDelete, handleFinish, disabledButtons }) => {

    const [totalAmount, setTotalAmount] = useState(0)

    console.log(disabledButtons);

    const embroideryTable = embroideryForm.map((element, i) => {
        const { nameEmbroidery, numberOfEmbroidery, price, id, date } = element

        return (
            <tr key={nameEmbroidery + i}>
                <td>{i + 1}</td>
                <td >{date}</td>
                <td ><Link to={`/details/${id}`} state={{ embroideryForm }}>{nameEmbroidery}</Link></td>
                <td >{numberOfEmbroidery}</td>
                <td>{price}</td>
                <td><b>{numberOfEmbroidery * price}</b></td>
                <td><button onClick={(e) => handleEdit(e)} id={id} className="edit-button" >Edit</button>
                    <button onClick={(e) => handleDelete(e)} id={id} className="delete-button" >Delete</button>
                    <button onClick={(e) => handleFinish(e)} id={id} className={`finish-button ${disabledButtons.find((item) => +item === id) ? "disabledButton" : ""}`} disabled={disabledButtons.find((item) => +item === id)} >Uradjeno</button>
                </td>
            </tr >
        )

    })





    let calculateAmount = embroideryForm.reduce((sum, item) => sum += item.price * item.numberOfEmbroidery, 0)

    useEffect(() => {
        setTotalAmount(calculateAmount)
    }, [embroideryForm])


    return (
        <div>
            <table className='table_App'>
                <tbody>
                    <tr>
                        <th>Br1.</th>
                        <th>Datum</th>
                        <th>Naziv Veza</th>
                        <th>Broj Komada</th>
                        <th>Cena</th>
                        <th>Ukupuno</th>
                        <th>Uredjivanje</th>
                    </tr>
                    {embroideryTable.length ? (embroideryTable) : null}

                </tbody>
            </table>

            <h1>Ukupan racun : {totalAmount}</h1>
        </div>
    )
}

export default Table