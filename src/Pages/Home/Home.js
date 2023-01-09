import React, { useState, useEffect } from 'react';
import Modal from '../../Components/Modal/Modal';
import Table from '../../Components/Table/Table';
import FinishedForm from '../FinishedForm/FinishedForm';
import Company from '../Company/Company';
import { v4 as uuidv4 } from 'uuid';


import './Home.css';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../Components/Firebase/firebaseConfig"
import 'firebase/database';
import { doc, setDoc, collection, deleteDoc, orderBy } from "firebase/firestore";


import { useCollectionData } from 'react-firebase-hooks/firestore';



function Home({ embroideryForm, setEmbroideryForm, embroideryFormInput, setEmbroideryFormInput, initialValues }) {


    const [finishedWork, setFinishedWork] = useState([])
    const [editForm, setEditForm] = useState(false)
    const [modal, setModal] = useState({ modal: false, deletedItem: {} })
    const [companyForm, setCompanyForm] = useState([])
    const [companiesData, setCompaniesData] = useState([])

    const [selectCompany, setSelectCompany] = useState()

    const [currentUser, setCurrentUser] = useState("");






    // useEffect(() => {
    //     const auth = getAuth();

    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             console.log(user);
    //             setCurrentUser(user.email)
    //             const uid = user.uid;
    //             // ...
    //         } else {
    //             setCurrentUser("")
    //             // User is signed out
    //             // ...
    //         }
    //     });
    // }, [])



    let queryData = collection(db, `Companies/${selectCompany}/orders`)

    const [CompanyData, loading] = useCollectionData(queryData);

    let queryDataCompleted = collection(db, `Companies/${selectCompany}/completed`)

    const [CompanyDataCompleted, loadingCompleted] = useCollectionData(queryDataCompleted);











    const handleNameChange = (e) => {
        const { name, value } = e.target
        setEmbroideryFormInput({ ...embroideryFormInput, [name]: value })
    }

    useEffect(() => {
        if (!loading) {
            setCompaniesData(CompanyData)
        }
    }, [loading, CompanyData])

    useEffect(() => {
        if (!loadingCompleted) {
            setFinishedWork(CompanyDataCompleted)
            console.log(CompanyDataCompleted);
            console.log(finishedWork);
        }
    }, [loadingCompleted, CompanyDataCompleted])

    console.log("com", CompanyData);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (!selectCompany) {
            alert("Unesi prvo ime kompanije")
            return
        }

        let documentId = uuidv4()

        if (editForm) {
            documentId = embroideryFormInput.id
        }


        setEmbroideryForm(companiesData)
        const selectFormCompany = { ...initialValues, selectCompany };
        const pathData = `Companies/${selectCompany}/orders/${documentId}`
        const docRef = doc(db, pathData)




        await setDoc(docRef, {
            nameEmbroidery: embroideryFormInput.nameEmbroidery,
            numberOfEmbroidery: +embroideryFormInput.numberOfEmbroidery,
            numberOfEmbroideryCompleted: +embroideryFormInput.numberOfEmbroidery,
            price: +embroideryFormInput.price,
            id: documentId,
            date: new Date().toLocaleDateString(),
            dateSecounds: Math.round(Date.now() / 1000),
            message: [],
            ImageArr: []
        })



        setEditForm(false)

        setEmbroideryFormInput(selectFormCompany)

    };


    const handleSelectCompany = (e) => {
        setSelectCompany(e.target.value)
    }







    const handleEdit = (e) => {
        let id = e.target.id


        let tempObj = companiesData.find(item => item.id === id)

        setEditForm(true)

        setEmbroideryFormInput(tempObj);

    }




    const handleDelete = (e) => {
        let itemToBeDeleted = companiesData.filter((item) => item.id === e.target.id)


        console.log(itemToBeDeleted);
        setModal(prev => ({ ...prev, modal: true, deletedItem: itemToBeDeleted[0] }))


    }


    const handleConfrmDelete = async () => {
        await deleteDoc(doc(db, `Companies/${selectCompany}/orders/`, `${modal.deletedItem.id}`));
        setModal(prev => ({ ...prev, modal: false }))
    }
    const handleCancleDelete = () => {
        setModal(prev => ({ ...prev, modal: false }))
    }



    const handleFinish = async (e) => {
        let buttonId = e.target.id

        const pathData = `Companies/${selectCompany}/completed/`
        const docRef = doc(db, pathData, `${buttonId}`)

        let finishedEmb



        const data = [...companiesData].find(item => item.id === buttonId)
        console.log("bb");
        data.numberOfEmbroideryCompleted === data.numberOfEmbroidery ? finishedEmb = data.numberOfEmbroidery : finishedEmb = data.numberOfEmbroideryCompleted
        console.log("a", finishedEmb);
        console.log(typeof (finishedEmb));
        await setDoc(docRef, {
            nameEmbroidery: data.nameEmbroidery,
            numberOfEmbroidery: finishedEmb,
            price: +data.price,
            message: data.message,
            id: data.id,
            date: new Date().toLocaleDateString(),
            dateSecounds: Math.round(Date.now() / 1000),
        })





    }



    return (
        <>
            <Company handleSelectCompany={handleSelectCompany} selectCompany={selectCompany} />
            {!modal.modal ?
                (
                    <div className="Home">
                        <h1>korisnik je:  {currentUser}</h1>
                        <div className="homeWrapper">

                            <form onSubmit={handleSubmitForm}>
                                <div className='formWrapper'>

                                    <label htmlFor="nameEmbroidery">Naziv Veza</label>
                                    <input type="text" name='nameEmbroidery' value={embroideryFormInput.nameEmbroidery} id="nameEmbroidery" onChange={handleNameChange} />
                                    <label htmlFor="numberOfEmbroidery">Broj Komada</label>
                                    <input type="number" name='numberOfEmbroidery' id="numberOfEmbroidery" value={embroideryFormInput.numberOfEmbroidery} onChange={handleNameChange} />
                                    <label htmlFor="price">Cena</label>
                                    <input type="number" name='price' id="price" step="any" value={embroideryFormInput.price} onChange={handleNameChange} />

                                    <button type='submit'>Submit</button>
                                </div>
                            </form>
                        </div >
                        <Table finishedWork={finishedWork} handleEdit={handleEdit} handleDelete={handleDelete} handleFinish={handleFinish} embroideryFormInput={embroideryFormInput} companiesData={companiesData} selectCompany={selectCompany} />

                        <FinishedForm finishedWork={finishedWork} />
                    </div >
                ) : <Modal modal={modal} handleConfrmDelete={handleConfrmDelete} handleCancleDelete={handleCancleDelete} />
            }
        </>
    );
}

export default Home;
