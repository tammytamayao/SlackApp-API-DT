import {useEffect, useState, useContext} from "react";
import {Messages} from "./Messages";
import {useLocation, useParams} from "react-router-dom";
import {UserContextHeader, UserContextInfo} from "../context/HeaderContext";
import {client} from "../config/AxiosConfig";


export const Channel = () => {
    
    const [channelMembers, setChannelMembers] = useState([])
    const [channelDetails, setChannelDetails] = useState([])
    const [message, setMessage] = useState("");
    const contextHeader = useContext(UserContextHeader);
    const contextInfo = useContext(UserContextInfo);
    const [messages, setMessages] = useState([]);
    
    const params = useParams()
    const receiverClass = useLocation().state.receiverClass
    
    const getChannelDetails = async() => {
        const response = await client.get(`/channels/${params.userID}`, {headers: contextHeader})
        console.log("Channel details: ", response.data.data);
        setChannelDetails(response.data.data)
    }
    
    const submitHandler = async (evt) => {
        evt.preventDefault();
        try {
            const sentMessage = await client.post("/messages",{
                "receiver_id": params.userID,
                "receiver_class": receiverClass,
                "body": message,
            }, {
                headers: contextHeader
            })
            console.log(sentMessage)
            setMessage("");
            window.location.reload();
        } catch (error) {
            console.log(error.response)
        }
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