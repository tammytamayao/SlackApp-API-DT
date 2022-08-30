import {useEffect, useState, useContext} from "react";
import {Messages} from "./Messages";
import {useLocation, useParams} from "react-router-dom";
import {UserContextHeader, UserContextInfo} from "../context/HeaderContext";
import {client} from "../config/AxiosConfig";


export const Channel = () => {
    const contextInfo = useContext(UserContextInfo);
    const contextHeader = useContext(UserContextHeader);
    
    const [channelMembers, setChannelMembers] = useState([])
    const [channelMembersEmail, setChannelMembersEmail] = useState([])
    const [memberID, setMemberID] = useState([])
    const [channelDetails, setChannelDetails] = useState([])
    
    const [addChannelMember, setAddChannelMember] = useState({})
    
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    
    const data = JSON.parse(localStorage.getItem('userList'));
    const params = useParams()
    const receiverClass = useLocation().state.receiverClass
    
    const getChannelDetails = async() => {
        const response = await client.get(`/channels/${params.userID}`, {headers: contextHeader})
        console.log("Channel Members: ", response.data.data.channel_members);
        setChannelMembers(response.data.data.channel_members)
        setChannelDetails(response.data.data)
    }
    
    const getChannelMembers = async () => {
        const memberIDList = [memberID]
        console.log("getChannelMember", channelMembers)
        channelMembers.forEach((item) => {
            memberIDList.push(item.user_id)
            console.log(memberIDList)
        })
        setMemberID(memberIDList)
    }
    
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
    
    const addUserToChannel = async (evt) => {
        evt.preventDefault();
        const payload = {"id": params.userID, "member_id": addChannelMember.id}
        const response = await client.post("/channel/add_member", payload, {headers: contextHeader})
        console.log("Add user response: ", response)
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
        const getData = async () => {
            const response = await getChannelDetails();
            const memberResponse =  await getChannelMembers()
        }
        const dataResponse = getData();
        console.log("Channel members", channelMembers)
        console.log("Member ID: ", memberID);
    }, [])


    return (
        <div>
            <form action="" onSubmit={evt => addUserToChannel(evt)}>
                <input id="searchUser" value={inputText} onChange={inputHandler}/>
                <ul>
                    {filteredData.slice(0, 10).map((item) => (
                        <li key={item.id}
                            onClick={(e) => setAddChannelMember(item)}>{item.uid}</li>
                    ))}
                </ul>
                <p>Channel member to add: {addChannelMember.uid}</p>
                <button>Add User</button>
            </form>
            <form action="" onSubmit={evt => submitHandler(evt)}>
                <input type="text" placeholder={"Enter your message here: "} onChange={evt => setMessage(evt.target.value)}/>
                <button>Send!</button>
            </form>
            
            {/* For displaying channel members but can;t figure out how to get it to work*/}
            
            {channelMembers.map((member) => (
                <span key={member.user_id}>{member.user_id} </span>
            ))}
            {Messages(params.userID, receiverClass)}
        </div>
    )
}