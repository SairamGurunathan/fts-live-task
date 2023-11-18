import axios from "axios";
import { Constants } from "../Constants/Constants";
import { AccountAction } from "./AccountAction";

export const fetchCenter = (payload) => async (dispatch) => {

    try { 
      const response = await axios.post('api/v1/centers', payload)

      if (response.status === 201) {        
        window.location.pathname = "/center"
        dispatch(AccountAction());
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