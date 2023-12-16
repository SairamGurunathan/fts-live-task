import React, { useState } from 'react'
import AddImages from "../Assects/Images/addimage.svg";

const AddImage = () => {

    const [selectedAddFiles, setSelectedAddFiles] = useState([]);
    const [addImgPreview, setAddImgPreview] = useState([]);

    const handleFileImg = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setAddImgPreview([...addImgPreview, reader.result]);
          };

          reader.readAsDataURL(file);
          setSelectedAddFiles([...selectedAddFiles, file]);
        }
      };
    
    

  return (
    <>
    <div className="d-flex flex-row gap-3 mb-2">
        <label className="labels">Add more images*</label>
        <label className="labels">Min : 300px x 300px</label>
      </div>
      <div className='d-flex flex-row overflow-auto'>
      <label htmlFor="file">
          <img
            src={AddImages}
            alt="add"
            className="border border-2 rounded-3 add-image"
          />
        </label>
        {selectedAddFiles.map((file, index) => (
          <img
            key={index}
            src={addImgPreview[index]}
            alt={`add-Preview-${index}`}
            className="border border-2 ms-2 add-image"
            style={{ maxWidth: "35%", maxHeight: "300px" }}
          />
        ))}
        
        <input
          id="file"
          type="file"
          size="60"
          onChange={handleFileImg}
        />
      </div>
    </>
  )
}

export default AddImage