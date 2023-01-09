// import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from 'uuid';
// import { storage } from "../Firebase/firebaseConfig"
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"

// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../Firebase/firebaseConfig"

// const ImageUpload = ({ id, detailsEmbroideryForm, selectCompany }) => {
//     const [imageList, setImageList] = useState([]);
//     const [ImageUploadState, setImageUploadState] = useState(null)

//     const imageListRef = ref(storage, "images/")
//     console.log("ImgUplState", ImageUploadState);
//     const uploadImage = () => {
//         if (ImageUploadState === null) return


//         const imageRef = ref(storage, `images/${id}`)
//         uploadBytes(imageRef, ImageUploadState).then(() => {
//             alert("image uploaded")
//         })



//         // setDoc(docRef, { ImageArr: imageList }, { merge: true })
//     }
//     // console.log(detailsEmbroideryForm);
//     // console.log("imageList", imageList);
//     // console.log(id);

//     useEffect(() => {

//         let newArr = detailsEmbroideryForm.ImageArr.concat(imageList)
//         if (imageList.length) {
//             const pathData = `Companies/${selectCompany}/orders/${id}`
//             const docRef = doc(db, pathData)

//             setDoc(docRef, { ImageArr: newArr }, { merge: true })
//         }

//     }, [imageList])


//     useEffect(() => {

//         listAll(imageListRef).then((res) => {
//             res.items.forEach((item) => {
//                 getDownloadURL(item).then((url) => {
//                     console.log(item);
//                     setImageList([url])
//                 })
//             })
//         })
//     }, [])

//     return (
//         <div>
//             <h1>Upload and Display Image</h1>
//             {imageList && (
//                 <div>
//                     {
//                         detailsEmbroideryForm.ImageArr.map((image) => (
//                             <img key={uuidv4()} alt="not found" width={"200px"} src={image} />
//                         ))
//                     }
//                     <br />
//                     <button onClick={() => uploadImage()}>Upload</button>
//                 </div>
//             )}
//             <br />

//             <br />

//             <input

//                 type="file"
//                 name="myImage"
//                 onChange={(event) => {
//                     setImageUploadState(event.target.files[0]);
//                 }}
//             />

//         </div >
//     );
// };

// export default ImageUpload;





import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./ImageUpload.css"

import { storage } from "../Firebase/firebaseConfig"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig"

const ImageUpload = ({ id, detailsEmbroideryForm, selectCompany }) => {
    const [imageList, setImageList] = useState([]);
    const [ImageUploadState, setImageUploadState] = useState(null)
    const [progress, setProgress] = useState(0);




    const handleLog = () => {

    }

    useEffect(() => {

        let newArr = detailsEmbroideryForm.ImageArr.concat(imageList)
        if (imageList.length > 0) {
            const pathData = `Companies/${selectCompany}/orders/${id}`
            const docRef = doc(db, pathData)

            setDoc(docRef, { ImageArr: newArr }, { merge: true })
        }

    }, [imageList])

    console.log(detailsEmbroideryForm);


    const formHandler = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        uploadFiles(file);
    }

    const uploadFiles = (file) => {
        if (!file) return
        const storageRef = ref(storage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgress(prog)
        }, (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => setImageList(prev => [...prev, url]))
            }

        )
    }

    console.log(progress);

    return (
        <div>
            <h1>Upload and Display Image</h1>
            <button onClick={() => handleLog()}>Log</button>
            {imageList && (
                <div>
                    {
                        detailsEmbroideryForm.ImageArr.map((image) => (
                            <img key={uuidv4()} alt="not found" width={"200px"} src={image} />
                        ))
                    }
                    <br />

                </div>
            )}
            <br />

            <br />
            <form onSubmit={formHandler}>
                <input
                    type="file"
                    name="myImage"
                />

                <button type="submit">Upload</button>
            </form>


            <div className="uploadBarWrapper">
                <div className="uploadBar" style={{ "width": `${progress}%` }}><h3 className="lettersBar">Uploaded:{progress}%</h3></div>
            </div>
        </div >
    );
};

export default ImageUpload;