import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";
import {useContext} from "react";
import {UserContextHeader} from "../context/HeaderContext";
import {Messages} from "./Messages";
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

import './Messaging.css';


export const Messaging = () => {
    
    const [message, setMessage] = useState("");
    const contextHeader = useContext(UserContextHeader);
    
    const params = useParams()
    const receiverClass = useLocation().state.receiverClass;
    
     //For testing and checking
     console.log(`Params: ${params.userID}`)
     console.log(`Receiver Class: ${receiverClass}`)
    
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

    const username=JSON.parse(localStorage.getItem('userInfo')).email;
    
    return (
        <div>
            <div><Header/></div>
            <div className="DashboardDM-bottom"> 
                <SideBar/>
                <div className="Messaging-container">
                <div className="DM-title-container">
                    <span className="DM-title">
                        <span><img src={UserImg} className="DM-Header-userimgIcon" alt="sidebarIcon"/></span>
                        <span></span>
                    </span>
                </div>
                    <div>{Messages(params.userID, receiverClass)}</div>
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
                </div>
            </div>

        </div>
    )
}