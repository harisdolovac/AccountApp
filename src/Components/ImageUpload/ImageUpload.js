import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./ImageUpload.css"

import { storage } from "../Firebase/firebaseConfig"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig"

const ImageUpload = ({ id, detailsEmbroideryForm, selectCompany }) => {
    const [imageList, setImageList] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        let newArr = detailsEmbroideryForm.ImageArr.concat(imageList)
        if (imageList.length > 0) {
            const pathData = `Companies/${selectCompany}/orders/${id}`
            const docRef = doc(db, pathData)

            setDoc(docRef, { ImageArr: newArr }, { merge: true })
        }

    }, [imageList])

    const changeHandler = (e) => {
        setSelectedFile(e.target.value);
    };


    const formHandler = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        uploadFiles(file);
        setSelectedFile("Image uploaded successfully")
    }

    const uploadFiles = (file) => {
        if (!file) return
        const storageRef = ref(storage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgress(prog)
        }, (err) => alert(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => setImageList(prev => [...prev, url]))
            }

        )
    }

    return (
        <div>

            <div>
                {
                    detailsEmbroideryForm.ImageArr.map((image) => (
                        <img key={uuidv4()} alt="not found" width={"200px"} src={image} />
                    ))
                }
                <br />
            </div>

            <br />

            <br />
            <form onSubmit={formHandler}>
                <input
                    onChange={(e) => changeHandler(e)}
                    type="file"
                    name="myImage"
                />
                <div>{selectedFile}</div>
                <button type="submit">Upload</button>
            </form>


            <div className="uploadBarWrapper">
                <div className="uploadBar" style={{ "width": `${progress}%` }}><h3 className="lettersBar">Uploaded:{progress}%</h3></div>
            </div>
        </div >
    );
};

export default ImageUpload;