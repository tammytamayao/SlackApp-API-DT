import React from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const SideBar = () =>{
  const navigate=useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem('channelsList');
    navigate('/');
  }

  return (
    <div>
      <li><Link to="/DirectMessage">Direct Message</Link></li>
      <li><Link to="/Channel">Channel</Link></li>
      <li onClick={handleLogOut}>Log Out</li>
  </div>
  );
}
export default SideBar;