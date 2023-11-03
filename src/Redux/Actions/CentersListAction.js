import axios from "axios";
import { Constants } from "../Constants/Constants";

export const CentersListAction = (id) => async (dispatch) => {
    try { 
      const response = await axios.get(`api/v1/centers?organizationId.equals=${id}`)
      
      const { data } = response;
  
      dispatch({
        type: Constants.FETCH_CENTERSLIST,
        payload: data,
      });
      
    } catch (error) {
      console.error('An error occurred during add center:', error);
    } 
  };