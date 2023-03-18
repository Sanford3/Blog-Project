// import Header from "./Header";
// import {Outlet} from "react-router-dom";



// export default function Layout() {
//   return (
//     <main>
//       <Link to="./pages/CreatePost">Create New Post</Link>
//     </main>
//   );
// }

// import React from 'react'
// import { Link } from 'react-router-dom'

// function Layout() {
//   return (
//     <div>
//       <Link to="./pages/CreatePost">Create New Post</Link>
//     </div>
//   )
// }

// export default Layout

// import Header from "./Header";
// import {Outlet} from "react-router-dom";

// export default function Layout() {
//   return (
//     <main>
//       <Header />
//       <Outlet />
//     </main>
//   );
// }

import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  )
}
