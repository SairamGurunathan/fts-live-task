import axios from "axios";
import { Constants } from "../Constants/Constants";

export const FacilitiesGetPhotosAction = (id) => async (dispatch) => {
    try { 
      const response = await axios.get(`api/v1/facility/${id}/url`)
      
      const { data } = response;
      if(data?.status === 200){
      dispatch({
        type: Constants.FETCH_FACILITIES_PHOTO,
        payload: data,
      });
    }
    } catch (error) {
      console.error(error);
    } 
  };

export const FacilitiesPostPhotosAction = (id,payload) => async() =>{

    try{
        await axios.post(`api/v1/facility/photos?facilityId=${id}`,payload);
    }
    catch (error){
        console.log(error);
    }
}