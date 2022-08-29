import { React, useState,useEffect,useContext } from "react";

import { useNavigate } from "react-router-dom";

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

const gotoChatDM = () => {
	// navigate('/ChatDM');
    // navigate(`/Messaging/${item.uid}`)
}

return (
  <div className="main">

    <div>Direct Messages</div>

    <div>
      <span><label>To: </label><input id="searchUser" value={inputText} onChange={inputHandler}/></span>
    </div>

    <div>
	      <ul>
            {filteredData.map((item) => (
                <li key={item.id}  onClick={(e) => navigate(`/Messaging/${item.id}`) (e)}>{item.uid}</li>
            ))}
        </ul>
	  </div>
    
  </div>
);
}

export default DMHeader;