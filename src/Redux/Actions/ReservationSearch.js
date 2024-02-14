import axios from "axios";
import { Constants } from "../Constants/Constants";

export const ReservationSearch = (searchFormatStart,searchFormatend,id)=> async (dispatch)=> {
    const centerID = localStorage.getItem("centerId");
    try {
        const res = await axios.get(`api/v1/reservations?centerId.equals=${centerID}&start.greaterThanOrEqual=${searchFormatStart}&end.lessThanOrEqual=${searchFormatend}&Id.in=${id}`)
        if(res?.status === 200){
            dispatch({
                type: Constants.FETCH_RESERVASTION_SEARCH,
                payload: {data: res.data, success: true},
              });
        }
    } catch (error) {
        console.log(error);
    }
}