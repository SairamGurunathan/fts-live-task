import axios from "axios";
import { Constants } from "../Constants/Constants";
import { FacilitiesAction } from "./FacilitiesAction";

export const FacilitiesFormAction = (payload) => async (dispatch) => {

  try {
    const response = await axios.post("api/v1/facilities", payload);
    
      await dispatch({
        type: Constants.FETCH_ADD_SPORTSFORM,
        payload: { data: response?.data, statusCode: response?.status },
      });

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
      dispatch({
        type: Constants.FETCH_ADD_SPORTSFORM,
        payload: { data: response?.data },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
