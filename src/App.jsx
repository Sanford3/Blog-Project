// import logo from './logo.svg';
// import './App.css';
// import IndexPage from "./pages/IndexPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
//import {UserContextProvider} from "./UserContext";
// import {Routes, Route, BrowserRouter} from "react-router-dom";
// import CreatePost from './pages/CreatePost';
// import Layout from './Layout';
// import CreatePost from "./pages/CreatePost";

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<CreatePost/>}>
//             {/* <Route path="/create" element={<CreatePost/>}/> */}
//           </Route>
//         </Routes>
//       </BrowserRouter>

//     </div>
//   );
// }

// export default App;

// import './App.css'
// import Post from './Post.jsx'
// import Header from './Header.jsx'


// function App() {

//   return (
//   <main>
//     <Header/>
//     <Post />
//     <Post />
//     <Post />
//   </main>
//   )
// }

import "./App.css";
import Post from "./post.jsx";
import Header from "./Header.jsx";
import { Route, Router, Routes } from "react-router";
import RegLogin from "./pages/RegLogin";
import { BrowserRouter } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage />}/>
        <Route path={'/login'} element={<RegLogin/>}/>
        <Route path={'/register'} element={<RegLogin/>}/>
        <Route path={'/edit/:id'} element={<EditPost/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;

// export default App
