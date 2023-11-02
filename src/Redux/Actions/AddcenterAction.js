import axios from "axios";
import { Constants } from "../Constants/Constants";

export const fetchCenter = (payload) => async (dispatch) => {
  console.log(payload, "hsbiji");
    try { 
      const response = await axios.post('api/v1/centers', payload)
      const { data } = response;
  
      dispatch({
        type: Constants.FETCH_CENTER,
        payload: data,
      });
      
    } catch (error) {
      console.error('An error occurred during add center:', error);
    } 
  };