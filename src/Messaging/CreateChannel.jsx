import {client} from "../config/AxiosConfig";
import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {UserContextHeader} from "../context/HeaderContext";


export const CreateChannel = () => {
    const [channelName, setChannelName] = useState("");
    const [channelUserInput, setChannelUserInput] = useState("");
    const [channelUsers, setChannelUsers] = useState([]);
    const [currentUsers, setCurrentUsers] = useState([])
    
    let userArray = [...channelUserInput];
    let currentUsersAdded = [...currentUsers];
    
    const contextHeader = useContext(UserContextHeader);
    const data = JSON.parse(localStorage.getItem('userList'));
    
    const navigate = useNavigate();
    
    const payload = {"name": channelName, "user_ids": channelUsers}
    
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        let lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    
    const filteredData = data.filter((user) => {
        // if (inputText === '') {
        // 	return el;
        // }
        // else {
        // 	return el.uid.toLowerCase().includes(inputText)
        // }
        
        if (inputText !== "")
            return user.uid.toLowerCase().includes(inputText)
    })
    
    const createChannel = async (evt) => {
        evt.preventDefault();
        const response = await client.post("/channels", payload, {headers: contextHeader})
        console.log(response)
        userArray = [];
        navigate(`/Messaging/${response.data.data.id}`, {state: {receiverClass: "Channel"}})
    }
    
    const addUserToArray = (user) => {
        userArray.filter((item) => {
            if (item === user.id) {
                alert("That email is already added!")
            }
        })
        userArray.push(user.id)
        currentUsersAdded.push(user)
        setChannelUserInput(userArray);
        setCurrentUsers(currentUsersAdded);
        console.log("User array for payload", userArray)
        console.log("Current users added:", currentUsersAdded)
        console.log("Current users state:", currentUsers)
    }
    
    return (
        <div>
            <form action="" onSubmit={(evt) => createChannel(evt)}>
                <input type="text" placeholder={"Enter channel name here"} onChange={evt => setChannelName(evt.target.value)}/>
                <input id="searchUser" value={inputText} onChange={inputHandler}/>
                {/*<input type="text" onChange={evt => setChannelUserInput(evt.target.value)}/>*/}
                {/*<button onClick={() => addUserToArray()}>Add</button>*/}
                <ul>
                    {filteredData.slice(0, 10).map((item) => (
                        <li key={item.id}
                            onClick={(e) => addUserToArray(item)}>{item.uid}</li>
                    ))}
                </ul>
                <p>Current users: {currentUsers.map(user => (currentUsers.length &&
                    <span key={user.id}>{user.uid}, </span>
                ))}</p>
                {/*<p>Current users: {currentUsers.map} </p>*/}
                
                <button>Submit</button>
            </form>
        </div>
    )
}