import React from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import DM from '../components/Asset/DM.svg';
import Threads from '../components/Asset/Threads.svg';
import At from '../components/Asset/At.svg';
import Draft from '../components/Asset/Draft.svg';
import './SideBar.css';
import ArrowDown from '../components/Asset/ArrowDown.svg';
import WriteMsg from '../components/Asset/WriteMsg.svg';
import BookMark from '../components/Asset/BookMark.svg';
import Triangle from '../components/Asset/Triangle.svg';
import Options from '../components/Asset/Options.svg';
import Plus from '../components/Asset/Plus.svg';
import {ListConversations} from "../messaging/ListConversations";
import {ListChannels} from "../messaging/ListChannels";

const SideBar = () =>{
  const navigate=useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem('channelsList');
    navigate('/');
  }

  const DDM =()=> {
    navigate('/DashboardDM');
  }

  const DC =()=> {
    navigate('/DashboardChannel');
  }



  return (
    <div className='sidebar-container'>

    <div className='sidebar-title-container'>
      <span className='sidebar-title'>Avion School<img src={ArrowDown} className="sidebar-title-Icon" alt="sidebarIcon"/></span>
      <span><span className='sidebarIcon-newMsg-container'><img onClick={DDM} src={WriteMsg} className="sidebarIcon-newMsg" alt="sidebarIcon"/></span></span>
    </div>

    <div>
      <ul className='sidebar-top-ul'>
        <li className='sidebar-top-list'><img src={Threads} className="sidebarIcon" alt="sidebarIcon"/>Threads</li>
        <li className='sidebar-top-list' onClick={DDM}><img src={DM} className="sidebarIcon" alt="sidebarIcon"/>Direct Messages</li>
        <li className='sidebar-top-list'><img src={At} className="sidebarIcon" alt="sidebarIcon"/>Mentions & reactions</li>
        <li className='sidebar-top-list'><img src={Draft} className="sidebarIcon" alt="sidebarIcon"/>Drafts</li>
        <li className='sidebar-top-list'><img src={BookMark} className="sidebarIcon" alt="sidebarIcon"/>Saved Items</li>
      </ul>
    </div>

    <div className='sidebar-bottom-container'>
      <div className='sidebar-bottom'>
        <span><img src={Triangle} className="sidebar-bottom-Icon" alt="sidebarIcon"/></span>
        <span><span className='sidebar-bottom-caption' onClick={DC}>Channels</span></span>
        <span className='Icon-optionhidden'>
        <span ><img src={Options} className="sidebarIcon-option" alt="sidebarIcon"/></span>
        <span><img src={Plus} className="sidebarIcon-plus" alt="sidebarIcon"/></span>
        </span>
      </div>
      <span className='sidebar-list'>{ListChannels()}</span>

      <div className='sidebar-bottom'>
        <span><img src={Triangle} className="sidebar-bottom-Icon" alt="sidebarIcon"/></span>
        <span className='sidebar-bottom-caption' onClick={DDM}><span>Direct Messages</span></span>
        <span className='Icon-optionhidden'>
        <span><img src={Options} className="sidebarIcon-option" alt="sidebarIcon"/></span>
        <span><img src={Plus} className="sidebarIcon-plus" alt="sidebarIcon"/></span>
        </span>
      </div>
      <span className='sidebar-list'>{ListConversations()}</span>
    </div>

  </div>
  );
}
export default SideBar;