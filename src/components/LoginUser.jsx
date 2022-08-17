import {useEffect, useState} from "react";
import {client} from "../config/AxiosConfig";


export const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userDetails, setUserDetails] = useState()
    
    const loginUser = async (evt) => {
        evt.preventDefault();
        let response = await client.post('/auth/sign_in', {
            email: email,
            password: password,
        });
        console.log(response);
        setUserDetails(response.data)
    };
    
    
    
    return (
        <div>
            <form onSubmit={evt => loginUser(evt)}>
                <input type="text" placeholder={"Email"} onChange={evt => setEmail(evt.target.value)}/>
                <input type="password" placeholder={"Password"} onChange={evt => setPassword(evt.target.value)}/>
                <button type={"submit"}>Sign Up</button>
            </form>
        </div>
    )
}