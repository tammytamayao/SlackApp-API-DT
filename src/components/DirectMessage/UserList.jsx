import { React, useState,useEffect,useContext } from "react";
import {baseURL} from "../../config/AxiosConfig";

import { useNavigate } from "react-router-dom";

function UserList() {
const navigate=useNavigate();

const [inputText, setInputText] = useState("");
let inputHandler = (e) => {
  //convert input text to lower case
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
	navigate('/ChatDM');
}

return (
  <div className="main">
    <h1>Search User</h1>
    <form>
      <span><label>To: </label><input id="searchUser" value={inputText} onChange={inputHandler}/></span>
    </form>
    <div>
	<ul>
            {filteredData.map((item) => (
                <li key={item.id}  onClick={(e) => gotoChatDM (e)}>{item.uid}</li>
            ))}
        </ul>
	</div>
  </div>
);
}

export default UserList;