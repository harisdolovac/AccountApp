import React, { useState } from 'react'

const Test = () => {

    const [obj, setObj] = useState([
        {
            user1: {
                car: "red",
                age: 50
            },
            user2: {
                car: "blue",
                age: 60
            }
        }
    ])

    const handleClick = () => {
        // setObj(prevState => [...prevState, { user3: { car: "blue" } }])
        // setObj(prevObj => [
        //     ...prevObj[0],
        //     {
        //         user3: {
        //             car: "green",
        //             age: 30
        //         }
        //     }
        // ]);
        const newObj = [
            {
                ...obj[0],
                user3: {
                    car: "green",
                    age: 70
                }
            }
        ];


        setObj([{
            ...obj[0], user3: {
                car: "green",
                age: 70
            }


        }])

        // setObj(newObj);
    }

    const handleLog = () => {
        console.log(obj[0]);
    }

    console.log(obj);
    return (
        <div>
            <button onClick={handleClick}>submit</button>
            <button onClick={handleLog}>Log</button>
        </div>
    )
}

export default Test