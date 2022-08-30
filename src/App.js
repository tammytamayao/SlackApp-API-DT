import './App.css';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import {CreateUser} from "./components/Register/CreateUser";
import {LoginUser} from "./components/Login/LoginUser";
import Provider from './context/HeaderContext';
import Channel from './components/Channel/Channel';
import ChatDM from './components/Chat/ChatDM';
import ChatChannel from './components/Chat/ChatChannel';
import DashboardDM from './components/DashboardDM';
import DashboardChannel from './components/DashboardChannel';
import UserModal from './components/Modal/UserModal';
import {Messaging} from "./messaging/Messaging";

function App() {
    return (
        <Provider>
        <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path={"/LoginUser"} element={<LoginUser />} />
                        <Route path={"/"} element={<CreateUser />} />
                        <Route path={"/Channel"} element={<Channel/>}/>
                        <Route path={"/ChatDM"} element={<ChatDM/>}/>
                        <Route path={"/ChatChannel"} element={<ChatChannel/>}/>
                        <Route path={"/DashboardDM"} element={<DashboardDM/>}/>
                        <Route path={"/UserModal"} element={<UserModal/>}/>
                        <Route path={"/Messaging/:userID"} element={<Messaging/>}/>
                        <Route path={"/DashboardChannel"} element={<DashboardChannel/>}/>
                    </Routes>
                </BrowserRouter>
        </div>
        </Provider>
    );
}

export default App;
