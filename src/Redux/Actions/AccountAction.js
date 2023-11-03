import axios from "axios"
import { Constants } from "../Constants/Constants";


export const AccountAction = () => async(dispatch) =>{

    try{
        const response = await axios.get('api/account');
        const { data } = response;

        if(response.status === 200){

          dispatch({
            type: Constants.FETCH_ACCOUNT,
            payload: {data: data, success: true},
          });
        }
          
    }
    catch (error){
        console.log(error);
    }
}