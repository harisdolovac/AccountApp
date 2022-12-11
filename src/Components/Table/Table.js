import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Table.css"

const Table = ({ embroideryForm, handleEdit, handleDelete }) => {

    const [totalAmount, setTotalAmount] = useState(0)


    const embroideryTable = embroideryForm.map((element, i) => {
        const { nameEmbroidery, numberOfEmbroidery, price, id } = element


        return (
            <tr key={nameEmbroidery + i}>
                <td>{i + 1}</td>
                <td ><Link to={`/details/${id}`} state={{ embroideryForm }}>{nameEmbroidery}</Link></td>
                <td >{numberOfEmbroidery}</td>
                <td>{price}</td>
                <td><b>{numberOfEmbroidery * price}</b></td>
                <td><button onClick={(e) => handleEdit(e)} id={id}>Edit</button>
                    <button onClick={(e) => handleDelete(e)} id={id}>Delete</button>
                </td>
            </tr>
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

                    <tr className='tableRow__App'>
                        <th>Br.</th>
                        <th>Naziv Veza</th>
                        <th>Broj Komada</th>
                        <th>Cena</th>
                        <th>Ukupuno</th>
                        <th>Uredjivanje</th>
                    </tr>
                    {embroideryTable.length ? (embroideryTable) : (<tr><th>Popuni polja iznad</th></tr>)}

                </tbody>
            </table>

            <h1>Ukupan racun : {totalAmount}</h1>
        </div>
    )
}

export default Table