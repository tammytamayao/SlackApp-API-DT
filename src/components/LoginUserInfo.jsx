import React, { useContext } from "react"
import { UserContextHeader,UserContextInfo } from "../context/UseContext";

export function LoginUserInfo() {
  const contextHeader = useContext(UserContextHeader);
  const contextInfo = useContext(UserContextInfo);
  return (
    <div>
        <p>LOGIN USER INFO</p>
        <p>Email: {contextInfo.email} </p>
        <p>Password: {contextInfo.password}</p>
        <p>Access-token: {contextHeader["access-token"]}</p>
        <p>Client: {contextHeader.client}</p>
        <p>Expiry: {contextHeader.expiry}</p>
        <p>uid: {contextHeader.uid}</p>
    </div>
  )
}