import axios from "axios";
import { Constants } from "../Constants/Constants";

export const RefundFilterAction = (bookingFrom,bookinTo,resevationFrom,resevationTo) => async(dispatch)=>{
    const centerID = localStorage.getItem("centerId");
    try {
        const response = await axios.get(`api/v1/refunds?refundStatus.equals=0&centerId.equals=${centerID}&reservationNumber=&bookedOnStartDate=${bookingFrom}&bookedOnEndDate=${bookinTo}&reservedOnStartDate=${resevationFrom}&reservedOnEndDate=${resevationTo}&sortByName=false&sortByBookedOn=false&sortByReservationDate=false&pageNo=0&pageSize=5`);

        if(response.status === 200){
            dispatch({
                type: Constants.FETCH_REFUND_FILTER,
                payload: {data: response?.data},
              });
        }
    } catch (error) {
        console.log(error);
    }
}