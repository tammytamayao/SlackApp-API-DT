import {useState} from "react";
import {client} from "../config/AxiosConfig";
import { useNavigate } from "react-router-dom";
import loader from './Ellipsis.svg';

export const LoginUser = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [logInMsg,setLogInMsg]=useState({});
    const navigate=useNavigate();
    
    const login = async (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        
    const payload = {email: email, password: password};

        try {
            const response = await client.post('/auth/sign_in', payload);
            localStorage.setItem('userHeader',JSON.stringify(response.headers));
            localStorage.setItem('userInfo',JSON.stringify(payload));
            setIsLoading(false);
            navigate('/SendMessage');
        }
        catch (error) {
            console.log(error.response.data.errors);
            setIsLoading(false);
            setLogInMsg(error.response.data);
        }
    };
    
    return (
    <div>
    {isLoading ? (<p><img src={loader} alt='loading ...'/></p>) : (
    <div>
    <form onSubmit={evt => login(evt)}>
        <input type="text" placeholder={"Email"} onChange={evt => setEmail(evt.target.value)}/>
        <input type="password" placeholder={"Password"} onChange={evt => setPassword(evt.target.value)}/>
        <button type={"submit"}>Sign In</button>
    </form>
    </div>
    )}
    {logInMsg.success===false && !isLoading ? <p>{logInMsg.errors}</p> : null}
    </div>
    )
}