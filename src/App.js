import './App.css';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import {CreateUser} from "./components/CreateUser";
import {LoginUser} from "./components/LoginUser";
import {CreateUserWithFetch} from "./components/CreateUserWithFetch";
import {SendMessage } from './components/SendMessage';
import {LoginUserInfo} from './components/LoginUserInfo';

function App() {
    return (
        
        <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path={"/LoginUser"} element={<LoginUser />} />
                        <Route path={"/"} element={<CreateUser />} />
                        <Route path={"/SignupWithFetch"} element={<CreateUserWithFetch />} />
                        <Route path={"/SendMessage"} element={<SendMessage />} />
                        <Route path={"/LoginUserInfo"} element={<LoginUserInfo/>}/>

                    </Routes>
                </BrowserRouter>
        </div>
    );
}

export default App;
