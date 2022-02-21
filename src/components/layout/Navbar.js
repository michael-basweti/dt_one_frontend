import React, { useState, useContext, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { admin_side, client_side } from "./SidebarData";
// import logo_no from "../../media/logo_no_bg.png";
// import "./Navbar.css";
import AuthContext from "../../context/auth/AuthContext";
import SubMenu from "./SubMenu";

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const { logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser(); // eslint-disable-next-line
  }, []);
  // console.log(user);

  const onLogout = () => {
    logout();
    window.location.replace("/");
    // clearContacts()
  };

  let Sidebar = [];
  if (user) {
    if (user.usertype === 1) {
      Sidebar = admin_side;
    } else if (user.usertype === 2) {
      Sidebar = client_side;
    }
  } else {
    Sidebar = [];
  }

  // const onLogout = () => {
  //   logout();
  //   window.location.replace("/");
  //   // clearContacts()
  // };
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div className="hide-on-print">
      <nav className="navbar hide-on-print">
        <Link to="#" className="menu-bars1" style={{ color: "#fff" }}>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item d-flex ml-20"></li>
        </ul>
        {/* <img src={logo_no} className="logo_transparent" alt="" srcSet="" /> */}

        <ul className="navbar-nav ml-auto">
          <li className="nav-item text-center d-flex justify-content-center">
            <Link className="nav-link" to="#">
              {/* {user.branchid.description} */}
            </Link>
          </li>
        </ul>

        <div className="navbar-navl ml-auto mt-2 mt-lg-0">
          {/* <Link to="/" className="nav-linkl p-3">
              <i className="fas fa-home bg-color-font"></i> Login Page
            </Link> */}
          <Link to="/pass_change" className="nav-linkl p-3">
            <i className="fas fa-unlock bg-color-font"></i> Change Password
          </Link>
          <Link onClick={onLogout} to="#" className="nav-linkl p-3">
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </div>
      </nav>
      <hr className="divider" />
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle" style={{ color: "#fff" }}>
            <AiIcons.AiOutlineClose onClick={showSidebar} />
          </li>

          {Sidebar.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
