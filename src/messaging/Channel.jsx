import {useEffect, useState, useContext} from "react";
import {Messages} from "./Messages";
import {useLocation, useParams} from "react-router-dom";
import {UserContextHeader, UserContextInfo} from "../context/HeaderContext";
import {client} from "../config/AxiosConfig";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Bold from '../components/Asset/Bold.svg';
import Italic from '../components/Asset/Italic.svg';
import Underline from '../components/Asset/Underline.svg';
import Strikethrough from '../components/Asset/Strikethrough.svg';
import Numbering from '../components/Asset/Numbering.svg';
import Justify from '../components/Asset/Justify.svg';
import Code from '../components/Asset/Code.svg';
import Plane from '../components/Asset/Plane.svg';
import Vid from '../components/Asset/Vid.svg';
import Mic from '../components/Asset/Mic.svg';
import Share from '../components/Asset/Share.svg';
import At from '../components/Asset/At.svg';
import Plus from '../components/Asset/Plus.svg';
import Arrow from '../components/Asset/ArrowDown.svg';
import UserImg from '../components/Asset/UserImg.png';


export const Channel = () => {
    const contextInfo = useContext(UserContextInfo);
    const contextHeader = useContext(UserContextHeader);
    
    const [channelMembers, setChannelMembers] = useState([])
    const [channelDetails, setChannelDetails] = useState([])
    
    const [addChannelMember, setAddChannelMember] = useState({})
    
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    
    const data = JSON.parse(localStorage.getItem('userList'));
    const params = useParams()
    const receiverClass = useLocation().state.receiverClass
    
    const getChannelDetails = async() => {
        const response = await client.get(`/channels/${params.userID}`, {headers: contextHeader})
        console.log("Channel details: ", response.data.data);
        setChannelDetails(response.data.data)
    }
    
    const getChannelMembers = async () => {
        const memberIDList = await channelDetails.channel_members
        console.log("Member ID List: ", memberIDList);
        const filteredMembers = [];
        data.filter(member => {
        
        })
        console.log(filteredMembers)
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
        const response = getChannelDetails();
        const memberResponse = getChannelMembers()
    }, [])


    return (
    <div>
        <div><Header/></div>
        <div className="DashboardDM-bottom">
        <SideBar/>
        <div className="Messaging-container">
        <div className="DM-title-container">
            <span className="DM-title">
                <span></span>
            </span>
        </div>
           {/* <form action="" onSubmit={evt => addUserToChannel(evt)}>
                <input id="searchUser" value={inputText} onChange={inputHandler}/>
                <ul>
                    {filteredData.slice(0, 10).map((item) => (
                        <li key={item.id}
                            onClick={(e) => setAddChannelMember(item)}>{item.uid}</li>
                    ))}
                </ul>
                <p>Channel member to add: {addChannelMember.uid}</p>
                <button>Add User</button>
                    </form>*/}

             <form action="" onSubmit={evt => submitHandler(evt)} className="MsgInput-container-container-container" >
                        <div className="MsgInput-container-container">
                        <div className="MsgInput-container">
                            <div className="MsgIcon-top-container">
                                <div className="MsgIcon-top">
                                <img src={Bold} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Italic} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Underline} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Strikethrough} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Numbering} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Justify} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Code} className="MsgIcon" alt="MsgIcon"/>
                                </div>
                            </div>
                            <span><input id="MsgInput" type="text" placeholder={"Enter your message"} onChange={evt => setMessage(evt.target.value)}/></span>
                            <div className="MsgIcon-bottom-container">
                                <div className="MsgIcon-bottom">
                                <span>
                                <img src={Plus} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Vid} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Mic} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Share} className="MsgIcon" alt="MsgIcon"/>
                                <img src={At} className="MsgIcon" alt="MsgIcon"/>
                                </span>
                                <button className="MsgButton"><img src={Plane} className="MsgIcon" alt="MsgIcon"/></button>
                                <span className="Arrow" ><img src={Arrow} className="MsgIcon" alt="MsgIcon"/></span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </form>
            {Messages(params.userID, receiverClass)}
        </div>
        </div>
    </div>
    )
}