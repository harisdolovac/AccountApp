import React, { useState } from 'react';

import './Home.css';

import Modal from '../../Components/Modal/Modal';
import Table from '../../Components/Table/Table';
import FinishedForm from '../FinishedForm/FinishedForm';
import Company from '../Company/Company';


function Home({ embroideryForm, setEmbroideryForm }) {

    const initailValues = {
        nameEmbroidery: "",
        nameCompany: "",
        selectCompany: "",
        numberOfEmbroidery: 0,
        price: 0,
        id: null,
    }

    const [embroideryNames, setEmbroideryNames] = useState(initailValues)


    const [finishedWork, setFinishedWork] = useState([])
    const [editForm, setEditForm] = useState(null)
    const [modal, setModal] = useState({ modal: false, deletedItem: {} })
    const [disabledButtons, setDisabledbuttons] = useState([])


    const handleNameChange = (e) => {
        const { name, value } = e.target
        setEmbroideryNames({ ...embroideryNames, [name]: value })
    }

    console.log(embroideryForm);

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (editForm === null) {
            setEmbroideryForm((prev) => ([...prev, { ...embroideryNames, id: Math.random() * 10000, date: new Date().toLocaleDateString() }]))
        } else {
            let a = [...embroideryForm]
            a[editForm] = embroideryNames
            setEmbroideryForm(a)
            setEditForm(null)
        }

        setEmbroideryNames(initailValues)
    }

    const handleEdit = (e) => {
        let id = +e.target.id
        embroideryForm.find((item) => {
            if (item.id === id) {
                setEmbroideryNames(item)
                setEditForm(embroideryForm.indexOf(item))
            }
        })
    }

    const handleDelete = (e) => {
        let itemToBeDeleted = embroideryForm.filter((item) => item.id === +e.target.id)
        setModal(prev => ({ ...prev, modal: true, deletedItem: itemToBeDeleted[0] }))
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
                        <Company embroideryNames={embroideryNames} setEmbroideryNames={setEmbroideryNames} />


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
                        <Table embroideryForm={embroideryForm} setEmbroideryForm={setEmbroideryForm} handleEdit={handleEdit} handleDelete={handleDelete} handleFinish={handleFinish} disabledButtons={disabledButtons} />


                    </div >
                ) : <Modal modal={modal} handleConfrmDelete={handleConfrmDelete} handleCancleDelete={handleCancleDelete} />
            }
            <FinishedForm finishedWork={finishedWork} />
        </>
    );
}

export default Home;
