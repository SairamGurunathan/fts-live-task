import axios from "axios";
import { Constants } from "../Constants/Constants";

export const orgPhotosAction = (id) => async (dispatch) => {
    try { 
      const response = await axios.get(`/api/v1/center/${id}/url`)
      
      const { data } = response;
      if(data?.status === 200){
      dispatch({
        type: Constants.FETCH_ORG_PHOTOS,
        payload: data,
      });
    }
    } catch (error) {
      console.error(error);
    } 
  };