import axios from "axios";
import { Constants } from "../Constants/Constants";

export const RefundFilterDetailsAction = (id) => async(dispatch)=>{
    try {
        const response = await axios.get(`api/refunds/${id}`);

        if(response.status === 200){
            dispatch({
                type: Constants.FETCH_REFUND_FILTER_DETAILS,
                payload: {data: response?.data},
              });
        }
    } catch (error) {
        console.log(error);
    }
}