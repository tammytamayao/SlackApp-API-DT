import {useEffect, useState} from "react";
import {client} from "../config/AxiosConfig";


export const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userDetails, setUserDetails] = useState({})
    const [isPending, setIsPending] = useState(false);
    
    useEffect(() => {
        console.log("From useEffect: ", userDetails)
    }, [userDetails])
    
    const loginUser = async (evt) => {
        evt.preventDefault();
        setIsPending(true);
        
        const payload = {email: email, password: password}
        
        try {
            const response = await client.post('/auth/sign_in', payload);
            // the headers and user data are spread into userDetails, so you only need to access it from this object
            // maybe hook up userDetails to a context
            setUserDetails({...response.data.data, ...response.headers})
            
            // Uncomment these if you want to see how the response object is structured
            // console.log(response)
            // console.log("User Data Object", userData)
            // console.log(`User Details State:`, userDetails);
        }
        catch (error) {
            console.log("Error! ", error.message);
        }
        finally {
            setIsPending(false);
        }
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