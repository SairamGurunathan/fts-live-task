import axios from "axios"
import { Constants } from "../Constants/Constants";


export const AccountAction = () => async(dispatch) =>{

    try{
        const response = await axios.get('api/account');

        if(response.status === 200){
          localStorage.setItem("orgID",response?.data?.orgId)
          localStorage.setItem("firstName",response?.data?.firstName)
          localStorage.setItem("lastName",response?.data?.lastName)
          localStorage.setItem("orgName",response?.data?.orgName)
          
          dispatch({
            type: Constants.FETCH_ACCOUNT,
            payload: {data: response?.data, success: true},
          });
        }     
    }
    catch (error){
        console.log(error);
    }
}