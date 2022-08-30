import {useContext, useEffect, useState} from "react";
import {UserContextHeader, UserContextInfo} from "../context/HeaderContext";
import {baseURL, client} from "../config/AxiosConfig";


export const Messages = (userID, receiverClass) => {
    const contextHeader = useContext(UserContextHeader);
    const contextInfo = useContext(UserContextInfo);
    
    const [messages, setMessages] = useState([]);
    
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
            setMessages(response.data.data)
            
            // For displaying message array to console
            // console.log(response)
        } catch (error) {
            console.log(error.message)
        }
        
    }
    
    useEffect(() => {
        const response = getMessages(userID)
        // setMessages(response.data.data)
    }, [])
    
    return (
        <div>
            {messages.length > 0
                ? messages.map((message) => <p key={message.id}>{message.body}</p>)
                : <p>Looks like you don't have any messages</p>}
        </div>
    )
}