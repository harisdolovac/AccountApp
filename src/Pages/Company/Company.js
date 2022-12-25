import React, { useState } from 'react'
const { v4: uuidv4 } = require('uuid');


const Company = ({ embroideryNames, setEmbroideryNames, embroideryForm, setEmbroideryForm }) => {

    const [companyForm, setCompanyForm] = useState([])


    const submitCompanyForm = (e) => {
        e.preventDefault();
        const { nameCompany } = embroideryNames;
        console.log(embroideryNames);
        if (companyForm.includes(nameCompany)) {
            alert("isti naziv firme");
            return;
        }

        setCompanyForm(prev => [...prev, nameCompany]);
        setEmbroideryNames(prev => ({ ...prev, selectCompany: nameCompany, nameCompany: "" }));
        setEmbroideryForm(prev => [...prev, { [nameCompany]: [] }]);
    };




    const handleCompanyName = (e) => {
        setEmbroideryNames((prev) => ({ ...prev, selectCompany: e.target.value }))
    }

    const handleInputCompanyName = (e) => {
        console.log(companyForm);
        setEmbroideryNames((prev) => ({ ...prev, nameCompany: e.target.value }))

    }






    return (
        <div>
            <h1>Ime firme:{embroideryNames.selectCompany}</h1>


            <form onSubmit={(e) => submitCompanyForm(e)}>
                <label htmlFor="company">
                    <select value={embroideryNames.selectCompany} id="company" onChange={(e) => (handleCompanyName(e))}>
                        {companyForm.map((company) => (
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


