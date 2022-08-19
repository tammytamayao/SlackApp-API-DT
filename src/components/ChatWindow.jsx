import {client} from "../config/AxiosConfig";
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";

export const ChatWindow = () => {
    
    const { user } = useContext(AuthContext);
    
    return (
        <div>
        
        </div>
    )
}