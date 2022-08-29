// import {client} from "../config/AxiosConfig";
// import {useContext} from "react";
// import {UserContextHeader, UserContextInfo} from "../context/HeaderContext";
//
// export const GetMessages = async (userID, receiverClass) => {
//
//     const contextHeader = useContext(UserContextHeader);
//     const contextInfo = useContext(UserContextInfo);
//
//     try {
//         const response = await client.get(`/messages?sender_id=${contextInfo.id}&receiver_id=${userID}&receiver_class=User`,
//             {headers: contextHeader}
//         )
//         console.log(response)
//         return (response)
//     } catch (error) {
//         // if (response.data.errors) return null;
//         //     response.data.data.map((message) => setMessages((messages) => [...messages, message]))
//         console.log(error.message)
//     }
// }