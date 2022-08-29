<<<<<<< HEAD
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
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
>>>>>>> a43f953 (Initialize project using Create React App)
}

export default App;
