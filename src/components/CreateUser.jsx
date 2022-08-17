import {useEffect, useState} from "react";
import {client} from "../config/AxiosConfig";
import {useGetUserList} from "../hooks/useGetUserList";


export const CreateUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [userDetails, setUserDetails] = useState()
    
    // Variable is for testing
    const userList = useGetUserList()
    
    const createUser = async (evt) => {
        evt.preventDefault();
        let response = await client.post('/auth', {
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation
        });
        console.log(response);
        setUserDetails(response.data)
    };
    
    // Display user list to console for testing
    console.log(userList);
    
    return (
        <div>
            <form onSubmit={evt => createUser(evt)}>
                <input type="text" placeholder={"Email"} onChange={evt => setEmail(evt.target.value)}/>
                <input type="password" placeholder={"Password"} onChange={evt => setPassword(evt.target.value)}/>
                <input type="password" placeholder={"Re-type your password"}
                       onChange={evt => setPasswordConfirmation(evt.target.value)}/>
                <button type={"submit"}>Sign Up</button>
            </form>
        </div>
    )
}