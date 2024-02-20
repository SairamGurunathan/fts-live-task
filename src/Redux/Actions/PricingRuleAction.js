import axios from "axios";
import { Constants } from "../Constants/Constants";

export const PricingRuleAction = (id) => async (dispatch) => {
    const centerID = localStorage.getItem("centerId");
    try { 
      const response = await axios.get(`api/v1/pricing-rules?centerId=${centerID}&facilityIds=${id}`)

      const { data } = response;
  
      dispatch({
        type: Constants.FETCH_PRICING_RULE,
        payload: data,
      });
      
    } catch (error) {
      console.error(error);
    } 
  };