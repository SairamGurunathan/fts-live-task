import React, { useState } from "react";
import AddBanner from "../Assects/Images/addbanner.svg";

const AddBannerImage = ({setSelectedFiles}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFiles = (e) => {
    const files = e.target.files[0];
    setSelectedFiles(files);

    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-between mb-2">
        <label className="labels">Banner image</label>
        <label className="labels text-end pe-3">Min:800px x 600px</label>
      </div>
      <div>
        <label for="file-input">
          {!imagePreview && (
            <img
              src={AddBanner}
              alt="add"
              className="border border-2 rounded-3 img-fluid"
            />
          )}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="border border-2"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </label>
        <input id="file-input" type="file" size="60" onChange={handleFiles} />
      </div>
      <label for="file-input" className="btn btn-outline-primary mt-3">
                  Browse
      <input type="file" for="browse" size="60" />
      </label>
    </>
  );
};

export default AddBannerImage;
