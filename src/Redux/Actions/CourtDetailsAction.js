import axios from "axios";
import { Constants } from "../Constants/Constants";

export const CourtDetailsAction = (id) => async (dispatch) => {
    try { 
      const response = await axios.get(`api/v1/facility/${id}`)
      
      const { data } = response;
      
      dispatch({
        type: Constants.FETCH_COURTDETAILS,
        payload: data,
      });
      
    } catch (error) {
      console.error('An error occurred during add center:', error);
    } 
  };