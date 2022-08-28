import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {client} from "../../config/AxiosConfig";
import StackLogoWithText from '../Asset/Slack-Logo-With-Text.svg';
import loader from '../Asset/Ellipsis.svg';
import {Link} from "react-router-dom";
import './CreateUser.css'

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
    <div className="createuser-container-container">
        <div className="createuser-container">
        {isLoading ? (<p><img src={loader} alt='loading ...'/></p>) : (
            <div className="signin-container-container">
            <div className="signin-container">
            <div><img src={StackLogoWithText} alt='Slack' id="SlackLogoSignIn"/></div>
        <div className="headercreateuser-container">
        <div><span className="header-createuser">Sign up to Slack</span></div>
        <div><span>We suggest using the email address you use at work</span></div>
        </div>
            <form onSubmit={evt => createUser(evt)}>
                <div className="inputContainer"><input id="signinInput" type="text" placeholder={"Email"} onChange={evt => setEmail(evt.target.value)}/></div>
                <div className="inputContainer"><input id="signinInput" type="password" placeholder={"Password"} onChange={evt => setPassword(evt.target.value)}/></div>
                <div className="inputContainer"><input id="signinInput" type="password" placeholder={"Re-type your password"} onChange={evt => setPasswordConfirmation(evt.target.value)}/></div>
                <div className="signinBtn-container"><input id="signinBtn" type={"submit"} value="Continue"/></div>
            </form>
           
            </div>
            </div>
        )}
        {createUserStatus!=='success' && !isLoading ? <span className="errormsg">{createUserMsg}</span> : null}
        
            <div className="header2-container">
                <span className="header2-caption">Already using slack?</span>
                <span className="header2-link"><br/><Link to='/LoginUser'>Sign in to an existing workspace</Link></span>
            </div>
            <footer>
                <span>Privacy & terms</span>
                <span>Contact us</span>
                <span>Change Region</span>
            </footer>
        </div>
    </div>
    )
}
