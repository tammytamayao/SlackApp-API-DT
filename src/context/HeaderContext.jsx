import React, {useState}from "react"

const userHeader = JSON.parse(localStorage.getItem('userHeader'));
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

export const UserContextHeader = React.createContext(userHeader);
export const UserContextInfo = React.createContext(userInfo);

export default function Provider({ children }) {
  const [contextHeader] = useState(userHeader);
  const [contextInfo] = useState(userInfo);

return <UserContextHeader.Provider value={contextHeader}>
    <UserContextInfo.Provider value={contextInfo}>
    {children}
    </UserContextInfo.Provider>
    </UserContextHeader.Provider>
}