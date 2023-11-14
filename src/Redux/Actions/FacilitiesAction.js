import axios from "axios";
import { Constants } from "../Constants/Constants";

export const FacilitiesAction = (id)=> async(dispatch)=>{
    try {
        const response = await axios.get(`/api/v1/facilities?centerId.equals=${id}`)
        const { data } = response;
  
      dispatch({
        type: Constants.FETCH_FACILITIES,
        payload: data,
      });
        
    } catch (error) {
        console.log(error);
    }
}