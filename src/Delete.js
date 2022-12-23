import React, { useState } from 'react'

const Delete = () => {

    const [testObj, setTestObj] = useState({ 4: "55" })


    const handleClick = () => {
        setTestObj([
            testObj.find((item) => item > 12)])
    }
    console.log(testObj);

    let mapped = testObj.map((item, i) => <h1 key={i}>{item}</h1>)

    return (
        <div>

            <button onClick={handleClick}>onClick</button>
            jhgh

            {mapped}
        </div>
    )
}

export default Delete