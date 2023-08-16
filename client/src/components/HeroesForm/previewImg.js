import React from "react";

const PreviewImg = ({ file }) => {
    const [preview, setPreview] = React.useState(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result);
    };
    return (
        <div> {preview ? <img src = {preview} alt = "preview" height = "50px" width = "70px" /> : "Loading..."} </div>
    )
}

export default PreviewImg