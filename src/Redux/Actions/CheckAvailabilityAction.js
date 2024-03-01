import axios from "axios";
import { Constants } from "../Constants/Constants";

export const CheckAvailabilityAction = (id,start,end,mul,day) => async(dispatch)=> {
    const centerID = localStorage.getItem("centerId");
    try {
        const response = await axios.get(`api/v1/facility/getAvailability?centerId.equals=${centerID}&sportId.equals=${id}&startTime=${start}&endTime=${end}&isMultiple=${mul}&days=${day}`)
        if(response?.status === 200){
            dispatch({
                type: Constants.FETCH_CHECKAVAILABILITY,
                payload: {data: response.data, success: true},
              });
        }
    } catch (error) {
        console.log(error);
    }
}