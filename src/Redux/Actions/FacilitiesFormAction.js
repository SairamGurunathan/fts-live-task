import axios from "axios";
import { Constants } from "../Constants/Constants";
import { FacilitiesAction } from "./FacilitiesAction";
  
export const FacilitiesFormAction = (payload) => async (dispatch) => {
    const centerID = localStorage.getItem("centerId");
  try { 
    const response = await axios.post('api/v1/facilities',payload)

    const { data } = response;
    if(response?.status === 201){
      dispatch(FacilitiesAction(centerID))
      dispatch({
        type: Constants.FETCH_ADD_SPORTSFORM,
        payload: data,
      });
    }

  } catch (error) {
    console.error('An error occurred during login:', error);
  } 
};