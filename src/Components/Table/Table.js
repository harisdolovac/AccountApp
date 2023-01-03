import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Table.css"
const { v4: uuidv4 } = require('uuid');

const Table = ({ finishedWork, handleEdit, handleDelete, handleFinish, embroideryFormInput, companiesData }) => {

    const [totalAmount, setTotalAmount] = useState(0)

    let nameCompany = [embroideryFormInput.selectCompany]







    const embroideryTable = companiesData?.map((element, i) => {

        const { nameEmbroidery, numberOfEmbroidery, price, id, date } = element;

        return (
            <tr key={uuidv4()}>
                <td>{i + 1}</td>
                <td>{date}</td>
                <td>
                    <Link to={`/details/${id}`}>{nameEmbroidery}</Link>
                </td>
                <td>{numberOfEmbroidery}</td>
                <td>{price}</td>
                <td>
                    <b>{numberOfEmbroidery * price}</b>
                </td>
                <td>
                    <button
                        onClick={(e) => handleEdit(e)}
                        id={id}
                        className="edit-button"
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e) => handleDelete(e)}
                        id={id}
                        className="delete-button"
                    >
                        Delete
                    </button>
                    <button
                        onClick={(e) => handleFinish(e)}
                        id={id}
                        className={`finish-button ${finishedWork.find((item) => item.id === id)
                            ? "disabledButton"
                            : ""
                            }`}
                        disabled={finishedWork.find((item) => item.id === id)}
                    >
                        Uradjeno
                    </button>
                </td>
            </tr>
        );

    });




    // let calculateAmount = 0
    // if (embroideryForm.length > 0 && embroideryFormInput.selectCompany !== "") {
    //     calculateAmount = embroideryForm.find(item => item[nameCompany])[nameCompany].reduce((sum, item) => sum += item.price * item.numberOfEmbroidery, 0)
    // }
    // useEffect(() => {
    //     setTotalAmount(calculateAmount)
    // }, [calculateAmount])

    const calculateAmount = companiesData?.reduce((sum, item) => sum += item.price * item.numberOfEmbroidery, 0)

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
                    {embroideryTable?.length ? (embroideryTable) : null}

                </tbody>
            </table>

            <h1>Ukupan racun : {calculateAmount}</h1>
        </div>
    )
}

export default Table