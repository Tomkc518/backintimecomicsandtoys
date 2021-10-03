import React from "react";
import Cart from './cart'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from "@material-ui/core";
import Button from '@mui/material/Button';

const Header = () => {
  return (
  <AppBar position="sticky" sx={{
    background: "#121212",
    color: "rgba(255, 255, 255, 0.87)",
    width: 1
  }}>
    <Toolbar>
      <Button href="/">
        <Typography>
          Back In Time Comics and Toys
        </Typography>
      </Button>
      <Button href="/products">
        <Typography>
          Store
        </Typography>
      </Button>
      <Cart />
      <Button href="https://www.ebay.com/str/btcomics">
        <Typography>
          Ebay
        </Typography>
      </Button>
    </Toolbar>
  </AppBar>
  )
}


//   <>
//     <header className="site-header">
//         <a href="/" className="logo">
//             {RichText.asText(menu.data.title)}
//         </a>
//         <Links menuLinks={menu.data.menu_links} />
//         <style jsx>{`
//         .site-header {
//           height: 30px;
//           padding: 20px 0;
//           font-weight: 700;
//         }
//         .site-header a {
//           font-weight: 700;
//         }
//         .site-header a:hover {
//           color: #72767B;
//         }
//         .site-header .logo {
//           display: inline-block;
//           font-size: 22px;
//           font-weight: 900;
//           padding-left: 60px;
//         }
//         @media (max-width: 1060px) {
//           .site-header {
//             padding-left: 20px;
//             padding-right: 20px;
//           }
//         }
//         @media (max-width: 767px) {
//           .site-header {
//             height: auto;
//           }
//           .site-header {
//             position: absolute;
//             left: 0;
//             right: 0;
//           }
//           .site-header .logo {
//             display: block;
//             text-align: center;
//           }
//         `}</style>
//     </header>
//     <Cart />
//     </>
// );

// const Links = ({ menuLinks }) => {
//     if (menuLinks) {
//         return (
//             <nav>
//                 <ul>
//                     {menuLinks.map((menuLink, index) => (
//                         <li key={`menulink-${index}`}>
//                             <a href={Link.url(menuLink.link)}>
//                                 {RichText.asText(menuLink.label)}
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//                 <style jsx>{`
//           nav {
//             float: right;
//             padding-right: 60px;
//           }
//           nav ul {
//             margin: 0;
//             padding-left: 0;
//           }
//           nav li {
//             display: inline-block;
//             margin-left: 40px;
//           }
//           nav li a {
//             font-weight: 700;
//           }
//           nav li a:hover {
//             color: #72767B;
//           }
//           @media (max-width: 767px) {
//             nav {
//               float: none;
//               text-align: center;
//             }
//             nav li {
//               display: inline-block;
//               margin-left: 10px;
//               margin-right: 10px;
//             }
//           }
//           `}</style>
//             </nav>
//         )
//     }
//     return null
// }

export default Header;