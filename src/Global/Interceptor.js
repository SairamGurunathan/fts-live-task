import axios from "axios"

const interceptor = () => {
  const baseURL = 'https://c208-2405-201-e059-b805-dd66-852a-cb68-b613.ngrok-free.app/'

  axios.defaults.baseURL = baseURL
  axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('accessToken')
    if(token){
      config.baseURL = baseURL;
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['ngrok-skip-browser-warning'] = 'true';
    return config;
  },
  (error)=> Promise.reject(error)
  );

  axios.interceptors.response.use((response) => {
    
    return response;
  }, 
  (error)=> Promise.reject(error)
  );
}



export default interceptor

