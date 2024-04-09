import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { AccountAction } from "../Redux/Actions/AccountAction";
import Logo from "../Assects/Images/brandLogo.png";

const NavbarHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const orgSelector = useSelector(
    (state) => state?.AccountReducer?.account?.data
  );
  const profileName = (orgSelector?.firstName ? orgSelector?.firstName : "") + " " + (orgSelector?.lastName ? orgSelector?.lastName : "");

  const handleOrgInfo = () => {
    dispatch(AccountAction());
    navigate("/organizationinfo");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("orgID");
    localStorage.removeItem("orgName");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    window.location.href = "/";
  };

  return (
    <>
      <Navbar expand="lg" className="text-white bg-dark py-0 header">
        <Navbar.Brand onClick={() => navigate("/center")}>
          <div></div>
          <img
            alt="logo"
            src={Logo}
            width="150px"
            height="75px"
            className="d-inline-block align-top cursor-pointer"
          />
        </Navbar.Brand>
        <div className="d-flex align-items-center me-auto ms-2">
          <div className="text-capitalize">
          <h4 className="m-0 d-none d-sm-block">{orgSelector?.orgName ? orgSelector?.orgName : ""}</h4>
          </div>

        </div>

        <div className="d-flex align-items-center gap-1 me-1">
          <Icon icon="mdi:user-circle" className="fs-3 cursor-pointer d-md-block" />
          <NavDropdown
          
            title={profileName && profileName.length>0?profileName:""}
            id="collapsible-nav-dropdown"
            className="text-white fs-6"
          >
            <NavDropdown.Item onClick={handleOrgInfo}>
              Organization Info
            </NavDropdown.Item>
            <NavDropdown.Divider className="w-100" />
            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Navbar>
    </>
  );
};

export default NavbarHeader;
