import axios from "axios";
import { Constants } from "../Constants/Constants";

export const CostByPriceAction = (id,start,end,mul,day) => async (dispatch) => {
    try { 
      const response = await axios.get(`api/v1/costByPricingRule?ids=${id}&startTime=${start}&endTime=${end}&isMultiple=${mul}&daysList=${day}`)
      const { data } = response;
  
      dispatch({
        type: Constants.FETCH_COST_BY_PRICE,
        payload: data,
      });
      
    } catch (error) {
      console.error(error);
    } 
  };