import React, { useState } from 'react'


const { v4: uuidv4 } = require('uuid');

const Company = ({ embroideryNames, setEmbroideryNames, setEmbroideryForm }) => {

    const [companyForm, setCompanyForm] = useState([])



    const submitCompanyForm = (e) => {
        e.preventDefault()
        console.log(embroideryNames);
        let nameComp = embroideryNames.nameCompany
        setCompanyForm((prev) => [...prev, embroideryNames.nameCompany])
        setEmbroideryNames((prev) => ({ ...prev, selectCompany: embroideryNames.nameCompany, nameCompany: "" }))
        setEmbroideryForm(prev => [...prev, { [nameComp]: [] }])

    }


    const handleCompanyName = (e) => {
        setEmbroideryNames((prev) => ({ ...prev, selectCompany: e.target.value }))
    }

    const handleInputCompanyName = (e) => {
        setEmbroideryNames((prev) => ({ ...prev, nameCompany: e.target.value }))
    }






    return (
        <div>
            <h1>Ime firme:{embroideryNames.selectCompany}</h1>


            <form onSubmit={(e) => submitCompanyForm(e)}>
                <label htmlFor="company">
                    <select value={embroideryNames.selectCompany} id="company" onChange={(e) => (handleCompanyName(e))}>
                        {companyForm.map((company, i) => (
                            <option key={uuidv4()} value={company} >{company}</option>
                        ))}
                    </select>
                </label>
                <input value={embroideryNames.nameCompany} id="company" onChange={(e) => (handleInputCompanyName(e))} />
            </form>
        </div >
    )
}

export default Company


