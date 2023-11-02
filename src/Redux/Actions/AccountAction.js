import axios from "axios"
import { Constants } from "../Constants/Constants";


export const AccountAction = () => async(dispatch) =>{

    try{
        const response = await axios.get('api/account');
        
          const { data } = response;

          dispatch({
            type: Constants.FETCH_ACCOUNT,
            payload: data,
          });
    }
    catch (error){
        console.log(error);
    }
}