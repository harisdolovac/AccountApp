import React from 'react'

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
                            return item.finish ? (
                                <tr key={item.id}>
                                    <td>{i + 1}</td>
                                    <td>{item.date}</td>
                                    <td>{item.nameEmbroidery}</td>
                                    <td>{item.numberOfEmbroidery}</td>
                                    <td>{item.price}</td>
                                    <td>{item.price * item.numberOfEmbroidery}</td>

                                </tr>
                            ) : null
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FinishedForm