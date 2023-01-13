
import React, { useEffect, useState } from 'react'
import "./FinishedForm.css"
import { useNavigate, useLocation } from 'react-router-dom';

import { doc, setDoc, deleteDoc, collection } from "firebase/firestore";
import { db } from "../../Components/Firebase/firebaseConfig"
import { useCollectionData } from 'react-firebase-hooks/firestore';


const FinishedForm = () => {
    const [hideDelete, setHideDelete] = useState(false)
    const [pay, SetPay] = useState(0)
    const [totalPay, setTotalPay] = useState([])
    const [totalPayFirebase, setTotalPayFirebase] = useState([])
    const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];

    const location = useLocation()
    const finishedWork = location.state[0]?.data
    const selectCompany = location.state[1]?.data2


    let queryDataPaid = collection(db, `Companies/${selectCompany}/Paid`)

    const [CompanyDataPaid, loadingPaid] = useCollectionData(queryDataPaid);


    const monthData = [...finishedWork]
        .reduce((acc, item) => {
            const month = +item.date.split("/")[0];
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
    const handlePayment = (e) => {
        e.preventDefault()
        setHideDelete(!hideDelete)





        if (CompanyDataPaid && CompanyDataPaid.length > 0) {
            console.log("ASSDF");
            setTotalPay([...CompanyDataPaid[0].paidTotal, pay])
        }
    }



    console.log(CompanyDataPaid);

    useEffect(() => {


        const pathDataPaid = `Companies/${selectCompany}/Paid/Paid${selectCompany}`
        const docRefPayed = doc(db, pathDataPaid)
        if (totalPay.length > 0) {
            setDoc(docRefPayed, { paidTotal: totalPay }, { merge: true })
        }
    }, [totalPay])


    console.log(totalPay, "totalPay");

    useEffect(() => {
        if (CompanyDataPaid && CompanyDataPaid.length) {
            setTotalPayFirebase(CompanyDataPaid[0].paidTotal)
        }
    }, [loadingPaid, CompanyDataPaid])

    const navigate = useNavigate();
    console.log(totalPayFirebase);
    console.log(CompanyDataPaid);
    console.log(pay);

    return (
        <div>
            <button onClick={() => navigate(-1)} className='buttonCompleted' >Home</button>
            {Object.values(monthData).map(({ month, finishedWork }) => (
                <div key={month}>
                    <h1>{months[month - 1]}</h1>
                    <table className="table_App">
                        <thead>
                            <tr>
                                <th>Br</th>
                                <th className='hideDate'>Datum</th>
                                <th>Naziv Veza</th>
                                <th>Broj Kom.</th>
                                <th>Cena</th>
                                <th onClick={() => setHideDelete(!hideDelete)} >Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finishedWork
                                .sort((a, b) => a.dateSecounds - b.dateSecounds)
                                .map((item, i) => (
                                    <tr key={item.id}>
                                        <td>{i + 1}</td>
                                        <td className='hideDate'>{item.date}</td>
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
            <div className='FinisedFormTotalPaid' >
                <h4 className="">Ukupuno : {finishedWork.reduce((sum, item) => sum += item.numberOfEmbroidery * item.price, 0)}/</h4>
                <h4>Uplaceno : {totalPayFirebase.reduce((sum, item) => sum + item, 0)}</h4>
            </div>
            {hideDelete ? (<form onSubmit={(e) => handlePayment(e)}  >
                <input type="number" onChange={(e) => SetPay(+e.target.value)} />
                <button type='submit'>Submit</button>
            </form>) : null}


        </div>
    );
};

export default FinishedForm;
