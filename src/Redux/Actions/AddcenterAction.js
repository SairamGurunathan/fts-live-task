import axios from "axios";
import { Constants } from "../Constants/Constants";

export const fetchCenter = (payload) => async (dispatch) => {

    try { 
      const response = await axios.post('api/v1/centers', payload)

      if (response.status === 201) {        
        window.location.href = "/center"
      } else {
        console.error('Center not created');
      }

      const { data } = response;
  
      dispatch({
        type: Constants.FETCH_CENTER,
        payload: data,
      });
      
    } catch (error) {
      console.error('An error occurred during add center:', error);
    } 
  };