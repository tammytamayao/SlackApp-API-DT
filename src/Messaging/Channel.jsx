import {useEffect, useState} from "react";
import {Messages} from "./Messages";
import {useLocation, useParams} from "react-router-dom";
import {useContext} from "@types/react";
import {UserContextHeader, UserContextInfo} from "../context/HeaderContext";
import {client} from "../config/AxiosConfig";


export const Channel = () => {
    
    const [channelMembers, setChannelMembers] = useState([])
    const [channelDetails, setChannelDetails] = useState([])
    const contextHeader = useContext(UserContextHeader);
    const contextInfo = useContext(UserContextInfo);
    const [messages, setMessages] = useState([]);
    
    const params = useParams()
    const receiverClass = useLocation().state.receiverClass
    
    const getChannelDetails = async() => {
        const response = await client.get(`/channels/${params.userID}`, {headers: contextHeader})
        console.log(response.data.data);
        setChannelDetails(response.data.data)
    }
    
    useEffect(() => {
        const response = getChannelDetails();
    }, [])


    return (
        <div>
            <form action="" onSubmit={evt => submitHandler(evt)}>
                <input type="text" placeholder={"Enter your message here: "} onChange={evt => setMessage(evt.target.value)}/>
                <button>Send!</button>
            </form>
            {Messages(params.userID, receiverClass)}
        </div>
    )
}