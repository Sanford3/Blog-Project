// import {Link} from "react-router-dom";
// import {useContext, useEffect, useState} from "react";
// import {UserContext} from "./UserContext";

// export default function Header() {
//   const {setUserInfo,userInfo} = useContext(UserContext);
//   useEffect(() => {
//     fetch('http://localhost:4000/profile', {
//       credentials: 'include',
//     }).then(response => {
//       response.json().then(userInfo => {
//         setUserInfo(userInfo);
//       });
//     });
//   }, []);

//   function logout() {
//     fetch('http://localhost:4000/logout', {
//       credentials: 'include',
//       method: 'POST',
//     });
//     setUserInfo(null);
//   }

//   const username = userInfo?.username;

//   return (
//     <header>
//       <Link to="/" className="logo">MyBlog</Link>
//       <nav>
//         {username && (
//           <>
//             <Link to="/create">Create new post</Link>
//             <a onClick={logout}>Logout ({username})</a>
//           </>
//         )}
//         {!username && (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// }

// import logo from './logo.png'

// export default function Header(){
//     return(
//         <header>
//             <img src={logo} className='logo'></img>
//             <nav>
//                 <a href=''>Login</a>
//                 <a href=''>Register</a>
//             </nav>
//         </header>
//     )
// }

import logo from './logo.png'
import { Link } from 'react-router-dom'

export default function Header(){
    return(
        <header>
            <Link to="/"><img src={logo} className='logo'></img></Link>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    )
}