import axios from "axios";
import { Constants } from "../Constants/Constants";

export const FacilityListAction = (id) => async (dispatch) => {
    const centerID = localStorage.getItem("centerId");
    try { 
      const response = await axios.get(`api/v1/facilities?sportId.equals=${id}&centerId.equals=${centerID}`)
      
      const { data } = response;
  
      dispatch({
        type: Constants.FETCH_FACILITYLIST,
        payload: data,
      });
      
    } catch (error) {
      console.error(error);
    } 
  };