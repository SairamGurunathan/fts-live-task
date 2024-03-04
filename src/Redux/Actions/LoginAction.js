import axios from "axios";
import { Constants } from "../Constants/Constants";

  
export const fetchLogin = ({email,password,setIsAuthenticated}) => async (dispatch) => {
  try { 
    const response = await axios.post('api/user-management/login', {
      userName : email,
      password : password
    });

    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken); 
      window.location.href = "/center"
      setIsAuthenticated(true);
    } else {
      console.error('Login failed');
    }

    const { data } = response;

    dispatch({
      type: Constants.FETCH_LOGIN,
      payload: data,
    });
    
  } catch (error) {
    console.error('An error occurred during login:', error);
  } 
};

export const fetchPartner = ({organization,fName,lName,phNumber,email,role}) => async (dispatch) => {
 
  try {
    const response = await axios.post('api/user-management/create/organization', {
        phoneNumber: phNumber,
        orgName: organization,
        firstName: fName,
        lastName: lName,
        email: email,
        role : role,
    });

    if (response.status === 200) {
      console.log('created partner');
      
    } else {
      console.error('Login failed');
      
    }

    const { data } = response;
    dispatch({
      type: Constants.FETCH_PARTNER,
      payload: data,
    });
    
  } catch (error) {
    
    console.error('An error occurred during login:', error);
  } 
};