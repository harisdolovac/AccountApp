import React, { useState } from 'react'

const Company = ({ embroideryNames, setEmbroideryNames }) => {

    const [companyForm, setCompanyForm] = useState([])


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

    const handleCompanyForm = (e) => {
        e.preventDefault()
        console.log("Aaa");
    }





    return (
        <div>
            <h1>Ime firme:{embroideryNames.selectCompany}</h1>
            <form onSubmit={() => handleCompanyForm()}>
                <label htmlFor="company">
                    <select value={embroideryNames.selectCompany} id="company" onChange={(e) => (handleCompanyName(e))}>
                        {companyForm.map((company, i) => (
                            <option key={i} value={company} >{company}</option>
                        ))}
                    </select>
                </label>
            </form>
            <form onSubmit={(e) => submitCompanyForm(e)}>
                <input value={embroideryNames.nameCompany} id="company" onChange={(e) => (handleInputCompanyName(e))} />
            </form>
        </div >
    )
}

export default Company


