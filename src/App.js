import React, { useState, useEffect } from 'react';

import './App.css';
import Table from './Components/Table/Table';


function App() {

  const initailValues = {
    nameEmbroidery: "",
    numberOfEmbroidery: 0,
    price: 0,
    id: null,
  }

  const [embroideryNames, setEmbroideryNames] = useState(initailValues)
  const [embroideryForm, setEmbroideryForm] = useState([])
  const [editForm, setEditForm] = useState(null)
  const [testObj, setTestObj] = useState({ id: 5, price: 20, num: 99 })


  // useEffect(() => {
  //   setTestObj({ ...testObj, price: 50 })
  //   setTestObj(prev => ({ ...prev, id: 8 }))
  //   setTestObj((prev) => ({ ...prev, new: 5 }))
  // }, [])
  // console.log(testObj);

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


  return (
    <div className="App">

      <h1>Ime firme</h1>
      <div className="wrapper">
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


          <Table embroideryForm={embroideryForm} handleEdit={handleEdit} />

        </div >
      </div >
    </div >
  );
}

export default App;
