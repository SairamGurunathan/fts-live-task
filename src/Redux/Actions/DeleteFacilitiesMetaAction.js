import axios from "axios"
import { Constants } from "../Constants/Constants";

export const DeleteFacilitiesMetas = (id,editID) =>async(dispatch) => {
    try {
        const response = await axios.delete(`/api/facility-metas/${id}`)
        
        if(response?.status === 204){
            dispatch(FacilitiesMetasGetAction(editID))
        }else {
            console.error('Not deleted');
          }
    } catch (error) {
        console.log(error);
    }
}

export const FacilitiesMetasGetAction = (facilityId) => async (dispatch) => {
    try {
      const response = await axios.get(`/api/facility-metas?facilityId.equals=${facilityId}`);
      const { data } = response;
      if (response?.status === 200) {
        dispatch({
          type: Constants.FETCH_METAS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };