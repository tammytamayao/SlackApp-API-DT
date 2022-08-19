import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CreateUser} from "./components/CreateUser";
import {LoginUser} from "./components/LoginUser";
import {CreateUserWithFetch} from "./components/CreateUserWithFetch";
import { SendMessage } from './components/SendMessage';
import {DirectMessage} from './components/DirectMessage';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path={"/LoginUser"} element={<LoginUser />} />
                        <Route path={"/"} element={<CreateUser />} />
                        <Route path={"/SignupWithFetch"} element={<CreateUserWithFetch />} />
                        <Route path={"/SendMessage"} element={<SendMessage />} />
                        <Route path={"/DirectMessage"} element={<DirectMessage/>}/>
                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
}

export default App;
