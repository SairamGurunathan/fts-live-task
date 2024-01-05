import React, { useEffect, useState } from "react";
import AddImages from "../Assects/Images/addimage.svg";
import { useSelector } from "react-redux";

const AddFacilityImage = ({facilitySelect,setFacilitySelect,selectChange,setSelectChange}) => {
  const [facilityImagePreview, setFacilityImagePreview] = useState(null);
  const select = useSelector((state)=>state?.FacilitiesPhotoReducer?.facilitiesPhotos)

const handleFiles = (e) => {
    const files = e.target.files[0];
    setFacilitySelect(files);
    setSelectChange([...facilitySelect, facilityImagePreview])

    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFacilityImagePreview(reader.result);
      }
      reader.readAsDataURL(files);
    } else {
        setFacilityImagePreview(null);
    }
  };

  useEffect(()=>{
    setSelectChange(select)
    // eslint-disable-next-line
  },[select])
  
  return (
    <>
    <div className="d-flex flex-row gap-2">
     {selectChange ? (selectChange?.map((photo)=>(
                  <div>
                  <img 
                  src={photo?.url}
                  className='mt-2'
                  alt='add-img'
                  style={{height:"120px", overflow:"auto"}}
                  />
                  </div>
                )) ) : null}
      
        <label for="file-input">
          {!facilityImagePreview && (
            <div className="mt-2">
            <img
              src={AddImages}
              alt="add"
              className="border border-2 rounded-3"
              style={{height:"120px", overflow:"auto"}}
            />
            </div>
          )}
          {(facilityImagePreview && (
            <img
              src={facilityImagePreview}
              alt="Preview"
              className="border border-2 mt-2"
              style={{height:"120px", overflow:"auto"}}
            />
          ))}
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

export default AddFacilityImage;