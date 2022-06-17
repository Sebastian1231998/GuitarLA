import { REGISTRO_ERROR , OBTENER_USUARIOS, LOGIN_EXITOSO } from "../../types";


// eslint-disable-next-line
export default (state, action) =>{
  switch (action.type) {

    case LOGIN_EXITOSO: 
      localStorage.setItem("token", action.payload.token);
    
      return {
      
        ...state,
        token:action.payload.token,
        autenticado: true,
        mensaje: null,
        cargando:false
      };

    case REGISTRO_ERROR:
  
      localStorage.removeItem('token')
      localStorage.removeItem('Usuario')
      return {
        ...state,
        token:null,
        autenticado:null,
        mensaje: action.payload,
        usuario:null,
        cargando:false
      };

      case OBTENER_USUARIOS: 

      return{
        token:action.payload.token,
        ...state,
        usuario: action.payload,
        cargando:false,
        autenticado:true
      }

    default:
      return state;
  }


};

