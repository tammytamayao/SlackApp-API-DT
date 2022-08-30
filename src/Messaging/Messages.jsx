import {useContext, useEffect, useState} from "react";
import {UserContextHeader, UserContextInfo} from "../context/HeaderContext";
import {baseURL, client} from "../config/AxiosConfig";
import {useLocation, useParams} from "react-router-dom";


export const Messages = (userID, receiverClass) => {
    const contextHeader = useContext(UserContextHeader);
    const contextInfo = useContext(UserContextInfo);
    
    const [messages, setMessages] = useState([]);
    const [channelDetails, setChannelDetails] = useState([])
    
    const params = useParams()
    
    // For testing and checking
    // console.log(userID)
    // console.log(contextInfo.id)
    // console.log(`Messages length ${messages.length}`)
    // console.log(messages)
    
    
    const getMessages = async () => {
        setMessages([]);
        try {
            const response = await client.get(`/messages?sender_id=${contextInfo.id}&receiver_id=${userID}&receiver_class=${receiverClass}`,
                {headers: contextHeader}
            )
            console.log(response)
            setMessages(response.data.data)
            
            // For displaying message array to console
            // console.log(response)
        } catch (error) {
            console.log(error.message)
        }
        
    }
    
    const getChannelDetails = async() => {
        const response = await client.get(`/channels/${params.userID}`, {headers: contextHeader})
        console.log("Channel details: ", response.data.data);
        setChannelDetails(response.data.data)
    }
    
    useEffect(() => {
        const response = getMessages(userID)
        console.log(messages)
        // setMessages(response.data.data)
        if (receiverClass === "Channel")
            getChannelDetails()
        
    }, [])
    
    return (
        <div>
            {messages.length > 0
                ? messages.map((message) => <p key={message.id}>{message.sender.uid}{message.body}</p>)
                : <p>Looks like you don't have any messages</p>}
        </div>
    )
}