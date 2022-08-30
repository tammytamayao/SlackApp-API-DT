import { useState, useEffect, useRef } from 'react';
import {baseURL} from "../../config/AxiosConfig";
import {UserContextHeader} from '../../context/HeaderContext';

function ChannelFunction () {

    const headers = useContext(UserContextHeader);

    const [addId, setId] = useState('');
    
    const [myChannels, setCreatedChannels] = useState([]);
    const [newChannel, setNewChannel] = useState(0);
    const [addChannelSuccess, setAddChannelSuccess] = useState(false);

    const sortList = (list, type) => {
		if (type === 'channel') {
			return list.sort(function (a, b) {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			});
        }
    }
    
    /* CHANNELS FUNCTIONS */
    
    const getCreatedChannels = () => {
        var requestCreatedChannels = {
            method: 'GET',
            headers: headers,
            redirect: 'follow',
        };
    
    fetch(`${baseURL}/channel/owned`, requestCreatedChannels)
            .then((response) => response.json())
            .then((result) => {
                let updatedList = [];
                result.data.forEach((item) => {
                    updatedList.push({
                        name: item.name,
                        id: item.id,
                        created_at: item.created_at,
                    });
                });
                setCreatedChannels(sortList(updatedList, 'channel'));
            })
            .catch((error) => console.log('error', error));
        };

        useEffect(() => {
            getCreatedChannels();
        }, [success, newChannel]);
    
        useEffect(() => {
            getAllChannels();
            if (addChannelSuccess) {
                console.log('NEW CHANNEL ADDED: ', addId, addChannelSuccess);
                setAddChannelSuccess(false);
            }
        }, [success, newChannel]);

}

export default ChannelFunction