import axios from "axios";
import { Constants } from "../Constants/Constants";

export const CheckAvailabilityAction = () => async(dispatch)=> {
    const centerID = localStorage.getItem("centerId");
    try {
        const res = await axios.get(`api/v1/facility/getAvailability?centerId.equals=${centerID}&sportId.equals=${id}&startTime=2024-10-01T10:00:00Z&endTime=2024-10-31T11:00:00Z&isMultiple=true&days=sunday,monday`)
        if(res?.status === 200){
            dispatch({
                type: Constants.FETCH_CHECKAVAILABILITY,
                payload: {data: res.data, success: true},
              });
        }
    } catch (error) {
        console.log(error);
    }
}