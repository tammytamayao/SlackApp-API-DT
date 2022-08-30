import { React, useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserImg from '../Asset/UserImg.png';
import './DM-Header.css';

function DMHeader() {
const navigate=useNavigate();

const [inputText, setInputText] = useState("");
let inputHandler = (e) => {
  var lowerCase = e.target.value.toLowerCase();
  setInputText(lowerCase);
};

const data = JSON.parse(localStorage.getItem('userList'));

const filteredData = data.filter((el) => {
	if (inputText === '') {
		return el;
	}
	else {
		return el.uid.toLowerCase().includes(inputText)
	}
})

return (
  <div className="DM-Header-container-container">
    <div className="DM-Header-container">
    <div className="DM-title-container"><span className="DM-title">Direct Messages</span></div>
    <div className="DM-Header-label-container"><span className="DM-Header-label"><label>To: </label><input id="searchUser" value={inputText} onChange={inputHandler} placeholder="@somebody@example.com"/></span></div>
    <div>
    <ul className="DM-Header-ul">
        {filteredData.slice(0, 8).map((item) => (
          <li className="DM-Header-li" key={item.id}
            onClick={(e) => navigate(`/Messaging/${item.id}`, {state: {receiverClass: "User"}})}>
              <span>
                <span><img src={UserImg} className="DM-Header-userimgIcon" alt="sidebarIcon"/></span>
                <span className="DM-Header-username">{item.uid}</span>
              </span>
          </li>
        ))}
    </ul>
	  </div>
    </div>
  </div>
);
}

export default DMHeader;