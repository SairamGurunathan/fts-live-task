import axios from "axios"
import { FacilitiesAction } from "./FacilitiesAction";

export const DeleteFacilities = (id) =>async(dispatch) => {
    const centerID = localStorage.getItem("centerId");
    try {
        const response = await axios.delete(`api/v1/facilities/${id}`)
        if(response.status === 204){
            dispatch(FacilitiesAction(centerID ))
        }else {
            console.error('Not deleted');
          }
    
    } catch (error) {
        console.log(error);
    }
}