import axios from "axios";
import { Constants } from "../Constants/Constants";

export const SportsList = ()=> async (dispatch)=> {
    try {
        const res = await axios.get("/api/v1/sport-photos")

        if(res.status === 200){
            dispatch({
                type: Constants.FETCH_SPORTS_LIST,
                payload: {data: res.data, success: true},
              });
        }
    } catch (error) {
        console.log(error);
    }
}