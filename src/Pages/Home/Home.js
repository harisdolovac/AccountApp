import React, { useState, useEffect } from 'react';
import Modal from '../../Components/Modal/Modal';
import Table from '../../Components/Table/Table';
import FinishedForm from '../FinishedForm/FinishedForm';
import Company from '../Company/Company';
import { v4 as uuidv4 } from 'uuid';

import './Home.css';

import { getAuth, onAuthStateChanged } from "firebase/auth";


function Home({ embroideryForm, setEmbroideryForm, embroideryNames, setEmbroideryNames, initialValues }) {


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
        console.log(embroideryForm, initialValues, embroideryNames);
        setEmbroideryNames({ ...embroideryNames, [name]: value })
    }

    console.log(embroideryForm);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (!embroideryForm.length) {
            alert("Unesi prvo ime kompanije")
            return
        }

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
            updatedForm = [...embroideryForm]
            const updatedItem = { ...embroideryForm[indexOfUser()][editForm], ...embroideryNames, id: uuidv4(), date: new Date().toLocaleDateString() };
            updatedForm[indexOfUser()][embroideryNames.selectCompany][editForm] = updatedItem
            setEditForm(null);
        }
        setEmbroideryForm(updatedForm);

        const selectCompany = { ...initialValues, selectCompany: embroideryNames.selectCompany };
        setEmbroideryNames(selectCompany);
    };



    const handleEdit = (e) => {
        let id = e.target.id


        let tempObj = embroideryForm.find(item => item[embroideryNames.selectCompany])[embroideryNames.selectCompany]
        const updatedItem = tempObj.find((item) => {
            if (item.id === id) {
                setEmbroideryNames(item);
                setEditForm(tempObj.indexOf(item));
                return true;
            }
            return false;
        });
    }

    const indexOfUser = () => {
        return embroideryForm.findIndex((item) => Object.keys(item).join("") === embroideryNames.selectCompany)
    }

    const handleDelete = (e) => {
        const updatedForm = [...embroideryForm]
        const arrayWithObjects = updatedForm[indexOfUser()][embroideryNames.selectCompany]
        let itemToBeDeleted = arrayWithObjects.filter((item) => item.id === e.target.id)

        setModal(prev => ({ ...prev, modal: true, deletedItem: itemToBeDeleted[0] }))
    }



    const handleConfrmDelete = () => {
        let newForm = embroideryForm[indexOfUser()][embroideryNames.selectCompany].filter((item) => item.id !== modal.deletedItem.id)

        const updatedForm = [...embroideryForm];
        updatedForm[indexOfUser()][embroideryNames.selectCompany] = newForm;
        setModal(prev => ({ ...prev, modal: false }))
        return updatedForm;
    }
    const handleCancleDelete = () => {
        setModal(prev => ({ ...prev, modal: false }))
    }

    const handleFinish = (e) => {
        let buttonId = e.target.id
        const newForm = embroideryForm[indexOfUser()][embroideryNames.selectCompany].filter((item) => item.id === buttonId)
        newForm[0].date = new Date().toLocaleDateString()
        setFinishedWork(prev => [...prev, ...newForm])
        setDisabledbuttons(prev => [...prev, buttonId])
    }

    return (
        <>
            <Company embroideryNames={embroideryNames} setEmbroideryNames={setEmbroideryNames} setEmbroideryForm={setEmbroideryForm} embroideryForm={embroideryForm} />
            {!modal.modal ?
                (
                    <div className="Home">
                        <h1>korisnik je:  {currentUser}</h1>


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


                        <FinishedForm finishedWork={finishedWork} />
                    </div >
                ) : <Modal modal={modal} handleConfrmDelete={handleConfrmDelete} handleCancleDelete={handleCancleDelete} />
            }
        </>
    );
}

export default Home;
