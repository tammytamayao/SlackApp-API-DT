import axios from "axios";
import React, {useEffect, useState} from "react";

export const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const baseURL = "http://206.189.91.54/api/v1/";
    const client = axios.create({
        baseURL: baseURL,
    });
    
    useEffect(() => {
        const getMessages = async () => {
            const response = await client.get()
            setMessages(response.data);
        }
    }, [])
    
    return (
        <div>
        
        </div>
    )
}