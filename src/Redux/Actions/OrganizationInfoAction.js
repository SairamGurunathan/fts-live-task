import axios from "axios";
import { Constants } from "../Constants/Constants";
import { orgPhotosAction } from "./OrgPhotos";

export const OrgInfoAction = (id) => async(dispatch)=>{
    const centerID = localStorage.getItem("centerId");
    try {
        const response = await axios.get(`api/v1/organizations/${id}`);

        if(response.status === 200){
           await dispatch(orgPhotosAction(centerID))
           await dispatch({
                type: Constants.FETCH_ORGINFO,
                payload: {data: response?.data},
              });
        }
    } catch (error) {
        console.log(error);
    }
}

export const OrgInfoEditAction = (id,payload) => async(dispatch)=>{
    
    try {
        const response = await axios.put(`api/v1/organizations/${id}`,payload);

        if(response?.status === 200){
            dispatch({
                type: Constants.FETCH_ORGINFO,
                payload: {data: response?.data},
              });
        }
    } catch (error) {
        console.log(error);
    }
}