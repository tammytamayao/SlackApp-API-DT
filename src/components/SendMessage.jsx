import {client} from "../config/AxiosConfig";
import {useState} from "react";

export const SendMessage = () => {
    const MessageUrl='http://206.189.91.54/api/v1/messages';
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const {id,value} = e.target;
            if(id==='message'){
              setMessage(value);
            }
        }

    const messageData = {
        //'receiver_id':
        //'receiver_class':
        'body':message
    }
    
    return (
        <div>
            <form onSubmit={"sendMessage"}>
                <input id='message' value={message} type={"text"} placeholder={"Type your message here"} onChange={(e)=>handleInputChange(e)}/>
                <input type="submit" value='Send'/>
            </form>
            <div></div>
        </div>
    )
}