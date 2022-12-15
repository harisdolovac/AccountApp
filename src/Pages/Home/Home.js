import React, { useState } from 'react';

import './Home.css';

import Modal from '../../Components/Modal/Modal';
import Table from '../../Components/Table/Table';


function Home() {

    const initailValues = {
        nameEmbroidery: "",
        nameCompany: "",
        selectCompany: "",
        numberOfEmbroidery: 0,
        price: 0,
        id: null,
    }

    const [embroideryNames, setEmbroideryNames] = useState(initailValues)
    const [companyForm, setCompanyForm] = useState([])
    const [embroideryForm, setEmbroideryForm] = useState([])
    const [editForm, setEditForm] = useState(null)
    const [modal, setModal] = useState({ modal: false, deletedItem: {} })



    const handleNameChange = (e) => {
        const { name, value } = e.target
        setEmbroideryNames({ ...embroideryNames, [name]: value })
    }


    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (editForm === null) {
            setEmbroideryForm((prev) => ([...prev, { ...embroideryNames, id: Math.random() * 10000 }]))
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
    const handleConfrmDelete = () => {
        let newForm = embroideryForm.filter((item) => item.id !== modal.deletedItem.id)
        setEmbroideryForm(newForm)
        setModal(prev => ({ ...prev, modal: false }))
    }
    const handleCancleDelete = () => {
        setModal(prev => ({ ...prev, modal: false }))
    }

    const submitCompanyForm = (e) => {
        e.preventDefault()
        setCompanyForm((prev) => [...prev, embroideryNames.nameCompany])
        setEmbroideryNames((prev) => ({ ...prev, nameCompany: "" }))

    }
    const handleCompanyName = (e) => {
        setEmbroideryNames((prev) => ({ ...prev, selectCompany: e.target.value }))
    }

    const handleInputCompanyName = (e) => {
        setEmbroideryNames((prev) => ({ ...prev, nameCompany: e.target.value }))
    }

    return (
        <>
            {!modal.modal ?
                (
                    <div className="Home">
                        <h1>Ime firme:{embroideryNames.selectCompany}</h1>
                        {/* <form onSubmit={() => handleCompanyForm()}> */}
                        <label htmlFor="company">
                            <select value={embroideryNames.selectCompany} id="company" onChange={(e) => (handleCompanyName(e))}>
                                {companyForm.map((company, i) => (
                                    <option key={i} >{company}</option>
                                ))}
                            </select>
                        </label>
                        {/* </form> */}
                        <form onSubmit={(e) => submitCompanyForm(e)}>
                            <input value={embroideryNames.nameCompany} id="company" onChange={(e) => (handleInputCompanyName(e))} />
                        </form>

                        <div className="homeWrapper">
                            <div className='inputAndTable'>
                                <div>
                                    <form onSubmit={handleSubmitForm}>
                                        <div className='formWrapper'>
                                            <div>
                                                <label htmlFor="nameEmbroidery">Naziv Veza</label>
                                                <input type="text" name='nameEmbroidery' value={embroideryNames.nameEmbroidery} id="nameEmbroidery" onChange={handleNameChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="numberOfEmbroidery">Broj Komada</label>
                                                <input type="number" name='numberOfEmbroidery' value={embroideryNames.numberOfEmbroidery} id="numberOfEmbroidery" onChange={handleNameChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="price">Cena</label>
                                                <input type="number" name='price' id="price" step="any" value={embroideryNames.price} onChange={handleNameChange} />
                                            </div>
                                            <button type='submit'>Submit</button>
                                        </div>
                                    </form>
                                </div >
                                <Table embroideryForm={embroideryForm} handleEdit={handleEdit} handleDelete={handleDelete} />
                            </div >
                        </div >
                    </div >
                ) : <Modal modal={modal} handleConfrmDelete={handleConfrmDelete} handleCancleDelete={handleCancleDelete} />
            }
        </>
    );
}

export default Home;
