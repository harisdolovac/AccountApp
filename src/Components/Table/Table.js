import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Table.css"
const { v4: uuidv4 } = require('uuid');

const Table = ({ embroideryForm, handleEdit, handleDelete, handleFinish, embroideryNames, disabledButtons }) => {

    const [totalAmount, setTotalAmount] = useState(0)

    let a = [embroideryNames.selectCompany]



    // const embroideryTable = embroideryForm.map((element) => {
    //     if (element[embroideryNames.selectCompany] && element[embroideryNames.selectCompany].length > 0) {
    //         return element[embroideryNames.selectCompany].map((item, i) => {
    //             const { nameEmbroidery, numberOfEmbroidery, price, id, date } = item
    //             return (
    //                 <tr key={uuidv4()}>
    //                     <td>{i + 1}</td>
    //                     <td >{date}</td>
    //                     <td ><Link to={`/details/${id}`}  >{nameEmbroidery}</Link></td>
    //                     <td >{numberOfEmbroidery}</td>
    //                     <td>{price}</td>
    //                     <td><b>{numberOfEmbroidery * price}</b></td>
    //                     <td><button onClick={(e) => handleEdit(e)} id={id} className="edit-button" >Edit</button>
    //                         <button onClick={(e) => handleDelete(e)} id={id} className="delete-button" >Delete</button>
    //                         <button onClick={(e) => handleFinish(e)} id={id} className={`finish-button ${disabledButtons.find((item) => +item === id) ? "disabledButton" : ""}`} disabled={disabledButtons.find((item) => +item === id)} >Uradjeno</button>
    //                     </td>
    //                 </tr >
    //             )
    //         })

    //     }
    // })

    const embroideryTable = embroideryForm.flatMap((element) => {
        if (element[embroideryNames.selectCompany] && element[embroideryNames.selectCompany].length > 0) {
            return element[embroideryNames.selectCompany].map((item, i) => {
                const { nameEmbroidery, numberOfEmbroidery, price, id, date } = item;
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
                                className={`finish-button ${disabledButtons.find((item) => +item === id)
                                    ? "disabledButton"
                                    : ""
                                    }`}
                                disabled={disabledButtons.find((item) => +item === id)}
                            >
                                Uradjeno
                            </button>
                        </td>
                    </tr>
                );
            });
        }
    });






    let calculateAmount = 0
    if (embroideryForm.length > 0 && embroideryNames.selectCompany !== "") {
        calculateAmount = embroideryForm.find(item => item[a])[a].reduce((sum, item) => sum += item.price * item.numberOfEmbroidery, 0)
    }
    useEffect(() => {
        setTotalAmount(calculateAmount)
    }, [calculateAmount])




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