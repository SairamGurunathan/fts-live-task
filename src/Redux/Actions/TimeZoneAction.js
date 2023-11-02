import axios from "axios";
import { Constants } from "../Constants/Constants";

export const TimeZone = () => async(dispatch) =>{

    try{
        const response = await axios.get('api/timezones');
        const { data } = response;

          dispatch({
            type: Constants.FETCH_TIMEZONE,
            payload: data,
          });
    }
    catch (error){
        console.log(error);
    }
}