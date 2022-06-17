import AuthState from "../context/auth/authState";
import AlertaState from "../context/alertas/alertaState";
import LoginComponent from "../components/loginComponent";


const Login = () => {



     return(
      
      <AlertaState>
            <LoginComponent />
      </AlertaState>
 
     ); 

};

export default Login;
