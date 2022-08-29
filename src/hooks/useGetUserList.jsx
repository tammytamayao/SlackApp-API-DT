import {useState} from "react";
import {client} from "../config/AxiosConfig";


export const useGetUserList = async () => {
    const [userList, setUserList] = useState([]);
    
    let response = await client.get("/users");
    setUserList(await response.data)
    console.log(response.data)
    return userList;
}