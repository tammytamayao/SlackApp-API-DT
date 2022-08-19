import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {client} from "../config/AxiosConfig";

export const CreateUser = () => {
    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [userDetails, setUserDetails] = useState({});
    const [createUserMsg,setCreateUserMsg]=useState("");
    const [createUserStatus,setCreateUserStatus]=useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const payload = {email: email, password: password, password_confirmation: passwordConfirmation}
    
    let createUser = async (evt) => {
        evt.preventDefault();
        setIsLoading(true);
    try {
        const response = await client.post('/auth', payload);
        setUserDetails({...response.data.data, ...response.headers});
        console.log(userDetails);
        console.log(response.data.status);
        setCreateUserStatus(response.data.status);
        setIsLoading(false);
        alert('Created New User');
        navigate('/LoginUser');
    } catch (error) {
        console.log(error.response.data.status);
        console.log(error.response.data.errors.full_messages[0]);
        setCreateUserMsg(error.response.data.errors.full_messages[0]);
        setCreateUserStatus(error.response.data.status);
        setIsLoading(false);
    }

    };
    
    return (
        <div>
        {isLoading ? (<p>Loading ...</p>) : (
            <form onSubmit={evt => createUser(evt)}>
                <input type="text" placeholder={"Email"} onChange={evt => setEmail(evt.target.value)}/>
                <input type="password" placeholder={"Password"} onChange={evt => setPassword(evt.target.value)}/>
                <input type="password" placeholder={"Re-type your password"} onChange={evt => setPasswordConfirmation(evt.target.value)}/>
                <button type={"submit"}>Sign Up</button>
            </form>
        )}
        {createUserStatus!=='success' ? createUserMsg : null}
        </div>
    )
}
