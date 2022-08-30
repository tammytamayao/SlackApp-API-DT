import React from "react";
import UserModal from "./Modal/UserModal";
import DMHeader from "./DirectMessage/DM-Header";
import Header from "./Header";
import SideBar from "./SideBar";
import ChannelHeader from "./DirectMessage/Channel-Header";
import { CreateChannel } from "../messaging/CreateChannel";

function DashboardChannel () {
    return (
        <div>
        <Header/>
            <div className="DashboardDM-bottom">
            <SideBar/>
            <CreateChannel/>
            </div>
        </div>

    );
}

export default DashboardChannel;