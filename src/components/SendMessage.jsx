import {client} from "../config/AxiosConfig";
import {useState} from "react";

export const SendMessage = () => {
    const [message, setMessage] = useState("");
    const [uid,setUid]=useState();

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

    const sendMessage = () => {

    }
    
    return (
        <div>
            <div>
                <span><label>To: </label><input id='uid' value={uid} type={"text"} placeholder={"Enter email"} onChange={(e)=>handleInputChange(e)}/></span>
            </div>
            <form onSubmit={sendMessage}>
                <input id='message' value={message} type={"text"} placeholder={"Type your message here"} onChange={(e)=>handleInputChange(e)}/>
                <input type="submit" value='Send'/>
            </form>
        </div>
    )
}