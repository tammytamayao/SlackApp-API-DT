import React from "react";
import DMHeader from "./DirectMessage/DM-Header";
import Header from "./Header";
import SideBar from "./SideBar";

function DashboardDM () {
    return (
        <div>
        <Header/>
        <div className="DashboardDM-bottom">
            <SideBar/>
            <DMHeader/>
        </div>

        </div>

    );
}

export default DashboardDM