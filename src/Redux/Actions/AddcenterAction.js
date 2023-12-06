import axios from "axios";
import { Constants } from "../Constants/Constants";
import { AccountAction } from "./AccountAction";
import { photosAction } from "./PhotosAction";

export const fetchCenter = (payload,formData) => async (dispatch) => {
  
    try { 
      const response = await axios.post('api/v1/centers', payload)
      const { data } = response;

      if (response.status === 201) {  
        formData.append('centerId',data?.id)
        dispatch(AccountAction());
        dispatch(photosAction(formData))   
        dispatch({
          type: Constants.FETCH_CENTER,
          payload: data,
        });     
      } else {
        console.error('Center not created');
      }
  
    } catch (error) {
      console.error('An error occurred during add center:', error);
    } 
  };