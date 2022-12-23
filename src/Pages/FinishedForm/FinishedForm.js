import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const FinishedForm = ({ finishedWork }) => {
    return (
        <div>
            <table className='table_App'>
                <tbody>
                    <tr className='table_App'>
                        <th>Br.</th>
                        <th>Datum</th>
                        <th>Naziv Veza</th>
                        <th>Broj Komada</th>
                        <th>Cena</th>
                        <th>Ukupuno</th>
                    </tr>
                    {
                        finishedWork.map((item, i) => {
                            return (
                                <tr key={uuidv4()}>
                                    <td>{i + 1}</td>
                                    <td>{item.date}</td>
                                    <td>{item.nameEmbroidery}</td>
                                    <td>{item.numberOfEmbroidery}</td>
                                    <td>{item.price}</td>
                                    <td>{item.price * item.numberOfEmbroidery}</td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FinishedForm