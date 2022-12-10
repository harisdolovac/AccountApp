import React, { useState, useEffect } from 'react'

const Table = ({ embroideryForm, handleEdit }) => {

    const [totalAmount, setTotalAmount] = useState(0)

    const embroideryTable = embroideryForm.map((element, i) => {
        const { nameEmbroidery, numberOfEmbroidery, price, id } = element



        return (
            <tr key={nameEmbroidery + i}>
                <td>{i + 1}</td>
                <td>{nameEmbroidery}</td>
                <td >{numberOfEmbroidery}</td>
                <td>{price}</td>
                <td><b>{numberOfEmbroidery * price}</b></td>
                <td><button onClick={(e) => handleEdit(e)} id={id}>Edit</button></td>
            </tr>
        )

    })

    const fill = new Array(5).fill(0).map((item, i) => {
        return (
            <tr key={i}>
                <td>{i + 1}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
                    {embroideryTable.length ? (embroideryTable) : (fill)}

                </tbody>
            </table>

            <h1>Ukupan racun : {totalAmount}</h1>
        </div>
    )
}

export default Table