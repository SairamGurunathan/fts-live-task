import axios from "axios"

const interceptor = () => {
  const baseURL = 'https://dff2-2405-201-e059-b805-6c28-3a1b-58e2-be5b.ngrok-free.app'

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

