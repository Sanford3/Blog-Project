import logo from './logo.svg';
import './App.css';
// import IndexPage from "./pages/IndexPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
//import {UserContextProvider} from "./UserContext";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import CreatePost from './pages/CreatePost';
// import Layout from './Layout';
// import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreatePost/>}>
            {/* <Route path="/create" element={<CreatePost/>}/> */}
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
