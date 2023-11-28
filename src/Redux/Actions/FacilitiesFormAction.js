import axios from "axios";
import { Constants } from "../Constants/Constants";

  
export const fetchLogin = ({email,password,setIsAuthenticated}) => async (dispatch) => {
  

  try { 
    const response = await axios.post('api/v1/facilities', {
      userName : email,
      password : password
    });

    const { data } = response;

    dispatch({
      type: Constants.FETCH_LOGIN,
      payload: data,
    });
    
  } catch (error) {
    console.error('An error occurred during login:', error);
  } 
};