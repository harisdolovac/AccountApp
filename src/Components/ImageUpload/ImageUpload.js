import React, { useState } from "react";

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState([]);

    return (
        <div>
            <h1>Upload and Display Image</h1>
            {selectedImage && (
                <div>
                    {
                        selectedImage.map((image) => (
                            <img key={image.lastModified} alt="not found" width={"200px"} src={URL.createObjectURL(image)} />
                        ))
                    }
                    <br />
                    <button onClick={() => setSelectedImage([])}>Remove</button>
                </div>
            )}
            <br />

            <br />

            <input

                type="file"
                name="myImage"
                onChange={(event) => {
                    setSelectedImage((prevImg) => [...prevImg, event.target.files[0]]);
                }}
            />

        </div >
    );
};

export default ImageUpload;