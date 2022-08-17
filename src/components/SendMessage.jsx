import {client} from "../config/AxiosConfig";
import {useState} from "react";

export const SendMessage = () => {
    const [message, setMessage] = useState("");
    
    // const sendMessage = async () => {
    //     let response = await client.post("/messages", {
    //         receiver_id: 1
    //         receiver_class:
    //         body: message
    //     })
    // }
    
    
    return (
        <div>
            <form onSubmit={"sendMessage"}>
                <input type={"text"} placeholder={"Type your message here"}/>
                <button type={"submit"}></button>
            </form>
        </div>
    )
}