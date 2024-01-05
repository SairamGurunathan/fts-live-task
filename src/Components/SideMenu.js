import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCenterRoute =
    location.pathname !== "/center" &&
    location.pathname !== "/addcenter" &&
    location.pathname !== "/organizationinfo";

  return (
    <>
      <div className="d-flex flex-column px-2 pt-3 bg-white vh-100 side">
        <ul className="nav nav-pills side flex-column mb-auto gap-1">
          <li className="nav-item">
            <NavLink
              to="/center"
              className="nav-link sidenav"
              activeClassName="active-side"
              onClick={() => navigate("/center")}
            >
              <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row justify-content-between align-items-center ms-1 gap-1 ">
                  <Icon
                    icon="ic:baseline-home"
                    className="icon"
                    color={location.pathname === "/center" ? "#de342f" : "#424243"}
                    width="20"
                    height="20"
                  />
                  <p className="m-0 side-text" style={{ color: location.pathname === "/center" ? "#de342f" : "#424243" }}>Home</p>
                </div>
                <div className="text-muted">
                  <Icon
                    icon="iconamoon:arrow-right-2-light"
                    width="20"
                    height="20"
                  />
                </div>
              </div>
            </NavLink>
          </li>

          {isCenterRoute && (
            <li className="nav-item">
              <NavLink
                to="/facilities"
                className="nav-link sidenav"
                activeClassName="active-side"
                onClick={() => navigate("/facilities")}
              >
          
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center ms-1 gap-1 ">
                    <Icon
                      icon="ri:home-gear-fill"
                      className="icon"
                      color={location.pathname === "/facilities" ? "#de342f" : "#424243"}
                      width="20"
                      height="20"
                    />
                    <p className="m-0 side-text" style={{ color: location.pathname === "/facilities" ? "#de342f" : "#424243" }}>Facilities</p>
                  </div>
                  <div className="text-muted">
                    <Icon
                      icon="iconamoon:arrow-right-2-light"
                      width="20"
                      height="20"
                    />
                  </div>
                </div>
              </NavLink>
            </li>
          )}

          {isCenterRoute && (
            <li className="nav-item">
              <NavLink
              to="/pricing"
              className="nav-link sidenav"
              activeClassName="active-side"
              onClick={() => navigate("/pricing")}
            >
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center ms-1 gap-1 ">
                    <Icon
                      icon="raphael:dollar"
                      className="icon"
                      color={location.pathname === "/pricing" ? "#de342f" : "#424243"}
                      width="20"
                      height="20"
                    />
                    <p className="m-0 side-text" style={{ color: location.pathname === "/pricing" ? "#de342f" : "#424243" }}>Pricing</p>
                  </div>
                  <div className="text-muted">
                    <Icon
                      icon="iconamoon:arrow-right-2-light"
                      width="20"
                      height="20"
                    />
                  </div>
                </div>
              </NavLink>
            </li>
          )}

          {isCenterRoute && (
            <li className="nav-item">
              <NavLink
              to="/reservation"
              className="nav-link sidenav"
              activeClassName="active-side"
              onClick={() => navigate("/reservation")}
            >
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center ms-1 gap-1 ">
                    <Icon
                      icon="lucide:list-todo"
                      className="icon"
                      color={location.pathname === "/reservation" ? "#de342f" : "#424243"}
                      width="20"
                      height="20"
                    />
                    <p className="m-0 side-text" style={{ color: location.pathname === "/reservation" ? "#de342f" : "#424243" }}>Reservation</p>
                  </div>
                  <div className="text-muted">
                    <Icon
                      icon="iconamoon:arrow-right-2-light"
                      width="20"
                      height="20"
                    />
                  </div>
                </div>
              </NavLink>
            </li>
          )}

          {isCenterRoute && (
            <li className="nav-item">
              <NavLink
                to="/refunds"
                className="nav-link sidenav"
                activeClassName="active-side"
                onClick={() => navigate("/refunds")}
              >
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center ms-1 gap-1 ">
                    <Icon
                      icon="ri:refund-2-line"
                      className="icon"
                      color={location.pathname === "/refunds" ? "#de342f" : "#424243"}
                      width="20"
                      height="20"
                    />
                    <p className="m-0 side-text" style={{ color: location.pathname === "/refunds" ? "#de342f" : "#424243" }}>Refunds</p>
                  </div>
                  <div className="text-muted">
                    <Icon
                      icon="iconamoon:arrow-right-2-light"
                      width="20"
                      height="20"
                    />
                  </div>
                </div>
              </NavLink>
            </li>
          )}

          {isCenterRoute && (
            <li className="nav-item">
              <NavLink
              to="/usermanagement"
              className="nav-link sidenav"
              activeClassName="active-side"
              onClick={() => navigate("/usermanagement")}
            >
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center ms-1 gap-1 ">
                    <Icon
                      icon="fa-solid:user-cog"
                      className="icon"
                      color={location.pathname === "/usermanagement" ? "#de342f" : "#424243"}
                      width="20"
                      height="20"
                    />
                    <p className="m-0 text-nowrap side-text" style={{ color: location.pathname === "/usermanagement" ? "#de342f" : "#424243" }}>User Management</p>
                  </div>
                  <div className="text-muted">
                    <Icon
                      icon="iconamoon:arrow-right-2-light"
                      width="20"
                      height="20"
                    />
                  </div>
                </div>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default SideMenu;
