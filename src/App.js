import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CreateUser} from "./components/CreateUser";
import {LoginUser} from "./components/LoginUser";
import {CreateUserWithFetch} from "./components/CreateUserWithFetch";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<LoginUser />} />
                        <Route path={"/Signup"} element={<CreateUser />} />
                        <Route path={"/SignupWithFetch"} element={<CreateUserWithFetch />} />
                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
}

export default App;
