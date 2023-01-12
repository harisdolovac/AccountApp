import React, { useState, } from 'react'
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../Components/Firebase/firebaseConfig"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { v4 as uuidv4 } from 'uuid';



const Company = ({ handleSelectCompany, selectCompany }) => {
    const [companyNameInput, setCompanyNameInput] = useState("")

    const addCompany = async () => {
        const docRefComp = doc(db, 'Companies', companyNameInput)
        await setDoc(docRefComp, {
            nameOfCompany: companyNameInput,
            id: uuidv4()
        })
    }

    const queryComp = collection(db, "Companies")
    const [CompanyName] = useCollectionData(queryComp);


    const submitCompanyForm = (e) => {
        e.preventDefault();
        if (companyNameInput === "") {
            alert("Unesi naziv Firme")
            return
        }
        addCompany()
        setCompanyNameInput("")
    }

    const handleCompanyInputName = (e) => {
        let names = e.target.value
        if (CompanyName.some((item) => item.nameOfCompany.toLowerCase() === names.toLowerCase())) {
            alert("Ukucali ste postojeci naziv Firme")
            setCompanyNameInput("")
            return
        }
        setCompanyNameInput(names)
    }



    return (
        <div>
            <h1>Ime firme:{selectCompany}</h1>
            <form onSubmit={(e) => submitCompanyForm(e)}>
                <label htmlFor="company">
                    <select id="company" onChange={(e) => handleSelectCompany(e)} className="selectCompany">
                        {CompanyName?.map((company) => (
                            <option key={company.id}  >{company.nameOfCompany}</option>
                        ))}
                    </select>
                </label>
                <input value={companyNameInput} id="company" onChange={(e) => handleCompanyInputName(e)} />
            </form>
        </div >
    )
}

export default Company

