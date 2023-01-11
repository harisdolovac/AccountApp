
import React, { useState } from 'react'
import "./FinishedForm.css"


import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Components/Firebase/firebaseConfig"


const FinishedForm = ({ finishedWork, selectCompany }) => {
    const [hideDelete, setHideDelete] = useState(false)
    const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];

    const monthData = [...finishedWork]
        .reduce((acc, item) => {
            const month = +item.date.split("/")[1];
            if (!acc[month]) {
                acc[month] = {
                    month,
                    finishedWork: []
                };
            }
            acc[month].finishedWork.push(item);
            return acc;
        }, {});

    const calculateEveryMonth = (month) => {
        return monthData[month].finishedWork.reduce((sum, item) => sum += item.numberOfEmbroidery * item.price, 0)
    }

    const handleDeleteFinishedForm = (e) => {
        const id = e.target.id
        deleteDoc(doc(db, `Companies/${selectCompany}/completed/`, `${id}`));
    }

    return (
        <div>
            {Object.values(monthData).map(({ month, finishedWork }) => (
                <div key={month}>
                    <h1>{months[month - 1]}</h1>
                    <table className="table_App">
                        <thead>
                            <tr>
                                <th>Br.</th>
                                <th>Datum</th>
                                <th>Naziv Veza</th>
                                <th>Broj Komada</th>
                                <th>Cena</th>
                                <th onClick={() => setHideDelete(!hideDelete)} >Ukupuno</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finishedWork
                                .sort((a, b) => a.dateSecounds - b.dateSecounds)
                                .map((item, i) => (
                                    <tr key={item.id}>
                                        <td>{i + 1}</td>
                                        <td>{item.date}</td>
                                        <td>{item.nameEmbroidery}</td>
                                        <td>{item.numberOfEmbroidery}</td>
                                        <td>{item.price}</td>
                                        <td className="totalXButton">{item.price * item.numberOfEmbroidery}
                                            {
                                                hideDelete ? <button onClick={(e) => handleDeleteFinishedForm(e)} id={item.id}>x</button> : null
                                            }

                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className="FinisedFormTotal" >
                        <h4 className="FinisedFormTotalText">Ukpuno za {months[month - 1]}: {calculateEveryMonth(month)}</h4>
                    </div>
                    <br />
                </div>
            ))}
            <div className="FinisedFormTotal" >
                <h4 className="FinisedFormTotalText">Ukupuno : {finishedWork.reduce((sum, item) => sum += item.numberOfEmbroidery * item.price, 0)}</h4>
            </div>
        </div>
    );
};

export default FinishedForm;
