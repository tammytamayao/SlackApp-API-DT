import {useEffect, useContext, useState} from "react";
import {client} from "../config/AxiosConfig";
import {useNavigate} from "react-router-dom";
import {UserContextHeader, UserContextInfo} from "../context/HeaderContext";


export const ListChannels = () => {
    
    
    const navigate = useNavigate();
    
    const [channels, setChannels] = useState([]);
    const contextHeader = useContext(UserContextHeader);
    const contextInfo = useContext(UserContextInfo);
    
    
    const getChannels = async () => {
        try {
            const response = await client.get("/channels", {headers: contextHeader})
            console.log("Channel", response)
            setChannels(response.data.data)
        } catch (e) {
            console.log(e);
        }
        
    }
    
    useEffect(() =>{
        const response = getChannels();
    }, [])
    
    return (
        <div>
            {channels?.map(channel => (
                <div key={channel.id}>
                    <p onClick={() => navigate(`/Channel/${channel.id}`, {state: {receiverClass: "Channel"}})}>{channel.name}</p>
                </div>
            ))}
        </div>
    )
}