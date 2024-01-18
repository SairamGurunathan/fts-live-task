import axios from "axios";
import { FacilitiesAction } from "./FacilitiesAction";
import { FacilitiesGetPhotosAction, FacilitiesPostPhotosAction } from "./FacilitiesPhotoAction";
import { Constants } from "../Constants/Constants";

export const FacilitiesFormAction = (payload,formData) => async (dispatch) => {

  try {
    const response = await axios.post("api/v1/facilities", payload);

      if (response?.status === 201) {
        const facilityId = response?.data?.id
        formData.append('facilityId',response?.data?.id)
        await dispatch(FacilitiesPostPhotosAction(facilityId,formData))   
        await dispatch({
          type: Constants.FETCH_ADD_SPORTSFORM,
          payload: { data: response?.data, statusCode: response?.status },
        });     
      } else {
        console.error('Center not created');
      }
      return response?.data;

  } catch (error) {
    console.error(error);
  }
}

export const FacilitiesFormGetAction = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`api/v1/facility/${id}`);
    const { data } = response;
    if (response?.status === 200) {
      dispatch(FacilitiesGetPhotosAction(id))
      dispatch({
        type: Constants.FETCH_ADD_SPORTSFORM,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const FacilitiesEditFormAction = (id, payload) => async (dispatch) => {
  const centerID = localStorage.getItem("centerId");
  try {
    const response = await axios.put(`api/v1/facilities/${id}`, payload);

    if (response?.status === 200) {
      dispatch(FacilitiesAction(centerID))
      dispatch(FacilitiesGetPhotosAction(id))
      dispatch({
        type: Constants.FETCH_ADD_SPORTSFORM,
        payload: { data: response?.data },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const FacilityHoursDelete = (id)=>async(dispatch)=>{
  try {
    const response = await axios.delete(`api/facility-hours/${id}`)
    if (response?.status === 204) {
      await dispatch({
        type: Constants.FETCH_ADD_SPORTSFORM,
        payload: { data: response?.data, statusCode: response?.status },
      });     
    } else {
      console.error('Center not created');
    }
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}