import {React,useState, useContext,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {baseURL} from "../../config/AxiosConfig";
import {UserContextHeader} from '../../context/HeaderContext';


function NewChannel() {
	const headers = useContext(UserContextHeader);
	const navigate = useNavigate();
	const [addId, setId] = useState('');
	const [newChannelName, setNewChannelName] = useState('');
	const prevchannelsList=JSON.parse(localStorage.getItem('channelsList')) || [];
	const [channelsList, setChannelsList] = useState(prevchannelsList);

	const inputNewChannel = (e) => {
        setNewChannelName(e.target.value);
    };

	const createNewChannel = (e) => {
        e.preventDefault();
        var channelInfo = JSON.stringify({
            name: newChannelName,
            user_ids: [],
        });
    
        var requestNewChannel = {
            method: 'POST',
            headers: headers,
            body: channelInfo,
            redirect: 'follow',
        };
    
        fetch(`${baseURL}/channels`, requestNewChannel)
            .then((response) => response.json())
            .then((result) => {
                setId(String(result.data.id));
                setNewChannelName('');
				console.log("Added New Channel");
				console.log(channelsList);
				
            })
            .catch((error) => console.log(error));
        };

	const gotoChatChannel = () => {
		navigate('/ChatChannel');
	}
		


return (
  <div>
		<form onSubmit={(e) => createNewChannel(e)}>
				<input type="text" placeholder="Add new Channel..." value={newChannelName} onChange={inputNewChannel}/>
		</form>
		<div>
			<ul>
			{channelsList.map((item) => (
                <li key={item.id} onClick={gotoChatChannel}>{item.name}</li>
            ))}
			</ul>
		</div>
  </div>
);
}

export default NewChannel;