import React from "react";
import UserModal from "./Modal/UserModal";
import DMHeader from "./DirectMessage/DM-Header";
import Header from "./Header";
import SideBar from "./SideBar";
import ChannelHeader from "./DirectMessage/Channel-Header";

function DashboardChannel () {
    return (
        <div>
        <Header/>
            <div className="DashboardDM-bottom">
            <SideBar/>
            <ChannelHeader/>
            </div>
        </div>

    );
}

export default DashboardChannel;