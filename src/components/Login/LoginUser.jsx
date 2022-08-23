import {useEffect, useState, useContext} from "react";
import {client} from "../../config/AxiosConfig";
import { useNavigate } from "react-router-dom";
import loader from '../Asset/Ellipsis.svg';
import {UserContextHeader} from '../../context/HeaderContext';
import {baseURL} from "../../config/AxiosConfig";

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
            if(response.request.status===200) {
                console.log('Successfully Logged In');

            }
            setIsLoading(false);
            navigate('/DirectMessage');
            window.location.reload();
        }
        catch (error) {
            console.log(error.response.data.errors);
            setIsLoading(false);
            setLogInMsg(error.response.data);
        }
    };

    const headers = useContext(UserContextHeader);
    const prevchannelsList=JSON.parse(localStorage.getItem('channelsList')) || [];
    const [channelsList, setChannelsList] = useState(prevchannelsList);

    const initializeList = () => {

		let requestOptions = {
			method: 'GET',
			headers: headers,
			redirect: 'follow',
		};

		fetch(`${baseURL}/users`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				let userList = [];
				result.data.forEach((item) => {
					userList.push({
						name: item.name,
						id: item.id,
						uid: item.uid,
					});
				});
				localStorage.setItem('userList',JSON.stringify(userList));
			})
			.catch((error) => console.log('error', error));

            var requestAllMyChannels = {
                method: 'GET',
                headers: headers,
                redirect: 'follow',
            };
        
            fetch(`${baseURL}/channels`, requestAllMyChannels)
                .then((response) => response.json())
                .then((result) => {
                    let updatedList = [];
                    result.data.map((item) => {
                        updatedList.push({
                            name: item.name,
                            id: item.id,
                            owner_id: item.owner_id,
                            created_at: new Date(item.created_at),
                            updated_at: new Date(item.updated_at),
                        });
                    });
                        updatedList.map((item) => {
                            item.created_at = item.created_at.toUTCString();
                            item.updated_at = item.updated_at.toUTCString();
                        });
                    setChannelsList(updatedList);
                    localStorage.setItem('channelsList',JSON.stringify(result.data));
                })
                .catch((error) => console.log('error', error));
	}

    useEffect(() => {
		initializeList();
	}, []);
    
    return (
    <div>
    {isLoading ? (<p><img src={loader} alt='loading ...'/></p>) : (
    <div>
    <form onSubmit={evt => login(evt)}>
        <input type="text" placeholder={"Email"} onChange={evt => setEmail(evt.target.value)}/>
        <input type="password" placeholder={"Password"} onChange={evt => setPassword(evt.target.value)}/>
        <button type="submit" onClick={initializeList}>Sign In</button>
    </form>
    </div>
    )}
    {logInMsg.success===false && !isLoading ? <p>{logInMsg.errors}</p> : null}
    </div>
    )
}