import { Link } from 'react-router-dom'
import "./Table.css"
const { v4: uuidv4 } = require('uuid');

const Table = ({ finishedWork, handleEdit, handleDelete, handleFinish, companiesData, selectCompany }) => {




    const embroideryTable = companiesData.sort((a, b) => a.dateSecounds - b.dateSecounds)?.map((element, i) => {

        const { nameEmbroidery, numberOfEmbroidery, price, id, date, numberOfEmbroideryCompleted } = element;

        return (
            <tr key={uuidv4()}>
                <td>{i + 1}</td>
                <td >{date}</td>
                <td>
                    <Link to={`/details/${id}`} state={[{ data: companiesData }, { data2: selectCompany }]}>{nameEmbroidery}</Link>
                </td>
                <td><b>{numberOfEmbroidery}  {numberOfEmbroideryCompleted !== numberOfEmbroidery ? `/  ${numberOfEmbroideryCompleted}` : null}</b> </td>

                <td>{price}</td>
                <td>
                    <b>{numberOfEmbroidery * price}</b>
                </td>
                <td>
                    <button
                        onClick={(e) => handleEdit(e)}
                        id={id}
                        className="edit-button"
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e) => handleDelete(e)}
                        id={id}
                        className="delete-button"
                    >
                        Delete
                    </button>
                    <button
                        onClick={(e) => handleFinish(e)}
                        id={id}
                        className={`finish-button ${finishedWork.find((item) => item.id === id)
                            ? "disabledButton"
                            : ""
                            }`}
                        disabled={finishedWork.find((item) => item.id === id)}
                    >
                        Done
                    </button>
                </td>
            </tr>
        );

    });




    const calculateAmount = companiesData?.reduce((sum, item) => sum += item.price * item.numberOfEmbroidery, 0)

    return (
        <div>
            <table className='table_App'>
                <tbody>
                    <tr>
                        <th>Br</th>
                        <th>Datum</th>
                        <th>Naziv Veza</th>
                        <th>Broj Kom</th>
                        <th>Cena</th>
                        <th>Total</th>
                        <th>Uredi</th>
                    </tr>
                    {embroideryTable?.length ? (embroideryTable) : null}

                </tbody>
            </table>
            <h1>Ukupan
                <Link to={`/account`} state={[{ data: finishedWork }, { data2: selectCompany }]} style={{ color: "red", textDecorationLine: "none" }}> Racun</Link>: {calculateAmount}</h1>
        </div>
    )
}

export default Table