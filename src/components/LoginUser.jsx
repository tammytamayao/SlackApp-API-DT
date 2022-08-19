import {useEffect, useState} from "react";
import {client} from "../config/AxiosConfig";
import { useNavigate } from "react-router-dom";

export const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userDetails, setUserDetails] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [logInMsg,setLogInMsg]=useState({});
    const navigate=useNavigate();
    
    useEffect(() => {
        console.log("User: ", userDetails)
    }, [userDetails])
    
    const loginUser = async (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        
        const payload = {email: email, password: password}
        try {
            const response = await client.post('/auth/sign_in', payload);
            setUserDetails({...response.data.data, ...response.headers});
            alert('Login successful');
            setIsLoading(false);
            navigate('/DirectMessage');

        }
        catch (error) {
            console.log(error.response.data.errors);
            setIsLoading(false);
            setLogInMsg(error.response.data);
        }
    };
    
    return (
    <div>
    {isLoading ? (<p>Loading ...</p>) : (
    <form onSubmit={evt => loginUser(evt)}>
        <input type="text" placeholder={"Email"} onChange={evt => setEmail(evt.target.value)}/>
        <input type="password" placeholder={"Password"} onChange={evt => setPassword(evt.target.value)}/>
        <button type={"submit"}>Sign Up</button>
    </form>
    )}
    {logInMsg.success===false ? <p>{logInMsg.errors}</p> : null}
    </div>
    )
}