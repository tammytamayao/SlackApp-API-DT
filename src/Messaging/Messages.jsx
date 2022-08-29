import {useContext, useEffect, useState} from "react";
import {UserContextHeader, UserContextInfo} from "../context/HeaderContext";
import {baseURL, client} from "../config/AxiosConfig";


export const Messages = (userID) => {
    const contextHeader = useContext(UserContextHeader);
    const contextInfo = useContext(UserContextInfo);
    
    const [messages, setMessages] = useState([]);
    console.log(userID)
    console.log(contextInfo.id)
    
    const getMessages = async () => {
        setMessages([]);
        try {
            const response = await client.get(`/messages?sender_id=${contextInfo.id}&receiver_id=${userID}&receiver_class=User`,
                {headers: contextHeader}
            )
            setMessages(response.data.data)
            console.log(response)
        } catch (error) {
            // if (response.data.errors) return null;
            //     response.data.data.map((message) => setMessages((messages) => [...messages, message]))
            console.log(error.message)
        }
        
    }
    
    useEffect(() => {
        getMessages()
    }, [])
    
    return (
        <div>
            {messages.map((message) => (
                <p key={message.id}>{message.body}</p>
            ))}
        </div>
    )
}