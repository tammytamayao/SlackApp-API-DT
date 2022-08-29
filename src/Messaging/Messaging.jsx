import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";
import {useContext} from "react";
import {UserContextHeader} from "../context/HeaderContext";
import {Messages} from "./Messages";


export const Messaging = () => {
    
    const [message, setMessage] = useState("");
    const contextHeader = useContext(UserContextHeader);
    
    const params = useParams()
    const receiverClass = useLocation().state.receiverClass;
    
    // For testing and checking
    // console.log(`Params: ${params.userID}`)
    // console.log(location.state.receiverClass)
    // console.log(`Receiver Class: ${receiverClass}`)
    
    const submitHandler = async (evt) => {
        evt.preventDefault();
        try {
            const sentMessage = await client.post("/messages",{
                "receiver_id": params.userID,
                "receiver_class": "User",
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