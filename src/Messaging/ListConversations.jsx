import {useEffect, useState} from "react";
import {client} from "../config/AxiosConfig";
import {useContext} from "react";
import {UserContextHeader, UserContextInfo} from "../context/HeaderContext";
import {useNavigate} from "react-router-dom";


export const ListConversations = () => {
    
    const [conversations, setConversations] = useState([]);
    const contextHeader = useContext(UserContextHeader);
    const contextInfo = useContext(UserContextInfo);
    
    const navigate = useNavigate();
    
    
    const getConversations = async () => {
        try {
            const convo = await client.get("/users/recent", {headers: contextHeader})
            console.log("Convo", convo)
            setConversations(convo.data.data)
        } catch (e) {
            console.log(e);
        }
        
    }
    
    useEffect(() =>{
        getConversations();
    }, [])
    
    return (
        <div>
            {conversations.map(conversation => (
                <div key={conversation.id}>
                    <p onClick={() => navigate(`/Messaging/${conversation.id}`, {state: {receiverClass: "User"}})}>{conversation.uid}</p>
                </div>
            ))}
        </div>
    )
}