import axios from "axios"

export const photosAction = (payload) => async() =>{

    try{
        await axios.post('api/v1/center/photos',payload);
    }
    catch (error){
        console.log(error);
    }
}