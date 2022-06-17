import contextAxios from './axios'

const authToken = token =>{

    if(token){
        contextAxios.defaults.headers.common['x-auth-token'] = token
    }else{
        delete contextAxios.defaults.headers.common['x-auth-token']; 
    }


}

export default authToken; 