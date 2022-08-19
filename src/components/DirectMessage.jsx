import {client} from "../config/AxiosConfig";
import {useState} from "react";

export const DirectMessage =() =>{
    const [searchUser, setSearchUser] = useState("");

    const handleInputChange = (e) => {
        const {id,value} = e.target;
            if(id==='searchUser'){
                setSearchUser(value);
            }
        }

        
    const handleSubmit = () => {

    }
    
    return (
        <div>
            <span><label>To: </label><input id='searchUser' value={searchUser} type="email" placeholder={"Enter email"} onChange={(e)=>handleInputChange(e)}/></span>
            <span><input type="submit" value='Check' onClick={handleSubmit}/></span>
        </div>
    )
}