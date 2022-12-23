import React, { useState, useEffect } from 'react';
import Modal from '../../Components/Modal/Modal';
import Table from '../../Components/Table/Table';
import FinishedForm from '../FinishedForm/FinishedForm';
import Company from '../Company/Company';
import { v4 as uuidv4 } from 'uuid';

import './Home.css';

import { getAuth, onAuthStateChanged } from "firebase/auth";


function Home({ embroideryForm, setEmbroideryForm }) {

    const initialValues = {
        nameEmbroidery: "",
        nameCompany: "",
        selectCompany: "",
        numberOfEmbroidery: 0,
        price: 0,
        id: null,
    }

    const [embroideryNames, setEmbroideryNames] = useState(initialValues)
    const [finishedWork, setFinishedWork] = useState([])
    const [editForm, setEditForm] = useState(null)
    const [modal, setModal] = useState({ modal: false, deletedItem: {} })
    const [disabledButtons, setDisabledbuttons] = useState([])

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





    const handleNameChange = (e) => {
        const { name, value } = e.target
        setEmbroideryNames({ ...embroideryNames, [name]: value })
    }




    console.log("embroideryForm", embroideryForm);

    // const handleSubmitForm = (e) => {
    //     e.preventDefault();

    //     let updatedForm;
    //     if (editForm === null && embroideryForm.length) {
    //         updatedForm = embroideryForm.map((item) => {
    //             if (Object.keys(item).join("") === embroideryNames.selectCompany) {
    //                 return { ...item, [embroideryNames.selectCompany]: [...item[embroideryNames.selectCompany], embroideryNames] };
    //             } else {
    //                 return item;
    //             }
    //         });
    //     } else {
    //         const updatedItem = { ...embroideryForm[editForm], ...embroideryNames };
    //         updatedForm = [...embroideryForm.slice(0, editForm), updatedItem, ...embroideryForm.slice(editForm + 1)];
    //         setEditForm(null);
    //     }
    //     setEmbroideryForm(updatedForm);

    //     const selectCompany = { ...initialValues, selectCompany: embroideryNames.selectCompany };
    //     setEmbroideryNames(selectCompany);
    // };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        let updatedForm;
        if (editForm === null && embroideryForm.length) {
            updatedForm = embroideryForm.map((item) => {
                if (Object.keys(item).join("") === embroideryNames.selectCompany) {
                    return {
                        ...item,
                        [embroideryNames.selectCompany]: [
                            ...item[embroideryNames.selectCompany],
                            { ...embroideryNames, id: uuidv4(), date: new Date().toLocaleDateString() },
                        ],
                    };
                } else {
                    return item;
                }
            });
        } else {
            const updatedItem = { ...embroideryForm[editForm], ...embroideryNames, id: uuidv4(), date: new Date().toLocaleDateString() };
            updatedForm = [...embroideryForm.slice(0, editForm), updatedItem, ...embroideryForm.slice(editForm + 1)];
            setEditForm(null);
        }
        setEmbroideryForm(updatedForm);

        const selectCompany = { ...initialValues, selectCompany: embroideryNames.selectCompany };
        setEmbroideryNames(selectCompany);
    };


    const funcSimply = (eF, eN) => {

        return eF.find(item => item[eN.selectCompany])[eN.selectCompany]
    }


    const handleEdit = (e) => {
        let id = e.target.id

        console.log(
            embroideryForm.find(item => item[embroideryNames.selectCompany])[embroideryNames.selectCompany])
        console.log(funcSimply(embroideryForm, embroideryNames))

        // embroideryForm.find((item) => {
        //     if (item.id === id) {
        //         setEmbroideryNames(item)
        //         setEditForm(embroideryForm.indexOf(item))
        //     }
        // })
    }

    const handleDelete = (e) => {
        console.log(e.target.id);
        // let itemToBeDeleted = embroideryForm.filter((item) => item.id === +e.target.id)
        // setModal(prev => ({ ...prev, modal: true, deletedItem: itemToBeDeleted[0] }))
    }

    const handleFinish = (e) => {
        let buttonId = e.target.id
        const newForm = embroideryForm.filter((item) => item.id === +buttonId)
        newForm[0].date = new Date().toLocaleDateString()
        setFinishedWork(prev => [...prev, ...newForm])
        setDisabledbuttons(prev => [...prev, buttonId])
    }

    const handleConfrmDelete = () => {
        let newForm = embroideryForm.filter((item) => item.id !== modal.deletedItem.id)
        setEmbroideryForm(newForm)
        setModal(prev => ({ ...prev, modal: false }))
    }
    const handleCancleDelete = () => {
        setModal(prev => ({ ...prev, modal: false }))
    }



    return (
        <>
            {!modal.modal ?
                (
                    <div className="Home">
                        <h1>korisnik je:  {currentUser}</h1>
                        <Company embroideryNames={embroideryNames} setEmbroideryNames={setEmbroideryNames} setEmbroideryForm={setEmbroideryForm} />


                        <div className="homeWrapper">

                            <form onSubmit={handleSubmitForm}>
                                <div className='formWrapper'>

                                    <label htmlFor="nameEmbroidery">Naziv Veza</label>
                                    <input type="text" name='nameEmbroidery' value={embroideryNames.nameEmbroidery} id="nameEmbroidery" onChange={handleNameChange} />
                                    <label htmlFor="numberOfEmbroidery">Broj Komada</label>
                                    <input type="number" name='numberOfEmbroidery' value={embroideryNames.numberOfEmbroidery} id="numberOfEmbroidery" onChange={handleNameChange} />
                                    <label htmlFor="price">Cena</label>
                                    <input type="number" name='price' id="price" step="any" value={embroideryNames.price} onChange={handleNameChange} />

                                    <button type='submit'>Submit</button>
                                </div>
                            </form>
                        </div >
                        <Table embroideryForm={embroideryForm} setEmbroideryForm={setEmbroideryForm} handleEdit={handleEdit} handleDelete={handleDelete} handleFinish={handleFinish} embroideryNames={embroideryNames} disabledButtons={disabledButtons} />


                    </div >
                ) : <Modal modal={modal} handleConfrmDelete={handleConfrmDelete} handleCancleDelete={handleCancleDelete} />
            }
            <FinishedForm finishedWork={finishedWork} />
        </>
    );
}

export default Home;
