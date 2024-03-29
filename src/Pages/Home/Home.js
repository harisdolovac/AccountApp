import React, { useState, useEffect } from 'react';
import Modal from '../../Components/Modal/Modal';
import Table from '../../Components/Table/Table';
import Company from '../Company/Company';
import { v4 as uuidv4 } from 'uuid';
import './Home.css';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../Components/Firebase/firebaseConfig"
import 'firebase/database';
import { doc, setDoc, collection, deleteDoc } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';



function Home() {
    const initialValues = {
        nameEmbroidery: "",
        nameCompany: "",
        selectCompany: "",
        numberOfEmbroidery: 0,
        numberOfEmbroideryCompleted: 0,
        price: 0,
        id: null,
        message: []
    }

    const [embroideryFormInput, setEmbroideryFormInput] = useState(initialValues)



    const [finishedWork, setFinishedWork] = useState([])
    const [editForm, setEditForm] = useState(false)
    const [modal, setModal] = useState({ modal: false, deletedItem: {} })
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

    console.log(selectCompany, companiesData, finishedWork);

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
        }
    }, [loadingCompleted, CompanyDataCompleted])

    const shortenDate = () => new Date().toLocaleDateString().split("/").map((item) => item.length > 3 ? item.slice(2) : item).join("/")
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

        const selectFormCompany = { ...initialValues, selectCompany };
        const pathData = `Companies/${selectCompany}/orders/${documentId}`
        const docRef = doc(db, pathData)

        await setDoc(docRef, {
            nameEmbroidery: embroideryFormInput.nameEmbroidery,
            numberOfEmbroidery: +embroideryFormInput.numberOfEmbroidery,
            numberOfEmbroideryCompleted: +embroideryFormInput.numberOfEmbroidery,
            price: +embroideryFormInput.price,
            id: documentId,
            date: shortenDate(),
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
        data.numberOfEmbroideryCompleted === data.numberOfEmbroidery ? finishedEmb = data.numberOfEmbroidery : finishedEmb = data.numberOfEmbroideryCompleted
        await setDoc(docRef, {
            nameEmbroidery: data.nameEmbroidery,
            numberOfEmbroidery: finishedEmb,
            price: +data.price,
            message: data.message,
            id: data.id,
            date: shortenDate(),
            dateSecounds: Math.round(Date.now() / 1000),
        })
    }

    return (
        <>
            {!modal.modal ?
                (
                    <>
                        <Company handleSelectCompany={handleSelectCompany} selectCompany={selectCompany} />

                        <div className="homeWrapper">
                            <form onSubmit={handleSubmitForm}>

                                <label htmlFor="nameEmbroidery">Naziv Veza</label>
                                <input type="text" name='nameEmbroidery' value={embroideryFormInput.nameEmbroidery} id="nameEmbroidery" onChange={handleNameChange} />
                                <label htmlFor="numberOfEmbroidery">Broj Komada</label>
                                <input type="number" name='numberOfEmbroidery' id="numberOfEmbroidery" value={embroideryFormInput.numberOfEmbroidery} onChange={handleNameChange} />
                                <label htmlFor="price">Cena</label>
                                <input type="number" name='price' id="price" step="any" value={embroideryFormInput.price} onChange={handleNameChange} />
                                <button type='submit'>Submit</button>

                            </form>
                        </div >
                        <Table finishedWork={finishedWork} handleEdit={handleEdit} handleDelete={handleDelete} handleFinish={handleFinish} companiesData={companiesData} selectCompany={selectCompany} />

                    </>
                ) : <Modal modal={modal} handleConfrmDelete={handleConfrmDelete} handleCancleDelete={handleCancleDelete} />
            }
        </>
    );
}

export default Home;