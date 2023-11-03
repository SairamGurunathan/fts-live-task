import axios from "axios"

const interceptor = () => {
  const baseURL = 'https://dev-api.playzeon.com/'

  axios.defaults.baseURL = baseURL
  axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('accessToken')
    if(token){
      config.baseURL = baseURL;
      config.headers.Authorization = `Bearer ${token}`
    }
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

