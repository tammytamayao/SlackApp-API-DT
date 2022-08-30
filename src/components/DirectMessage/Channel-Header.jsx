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

const channeldata = JSON.parse(localStorage.getItem('channelsList'));

const filteredData = channeldata.filter((el) => {
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
    <div className="DM-title-container"><span className="DM-title">AllChannels</span></div>
    <div className="DM-Header-label-container"><span className="DM-Header-label"><label>To: </label><input id="searchUser" value={inputText} onChange={inputHandler} placeholder="Search by channel name"/></span></div>
    <div>
    <ul className="DM-Header-ul">
        {filteredData.slice(0, 8).map((item) => (
          <li className="DM-Header-li" key={item.id}>
                <span className="DM-Header-username">{item.name}</span>
          </li>
        ))}
    </ul>
	  </div>
    </div>
  </div>
);
}

export default DMHeader;