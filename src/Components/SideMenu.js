import { Icon } from "@iconify/react";
import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

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
        <ul className="nav nav-pills side flex-column mb-auto gap-2">
          <li className="nav-item">
            <NavLink
              to="/center"
              className="nav-link"
              activeClassName="active"
              onClick={() => navigate("/center")}
            >
              <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger">
                  <Icon
                    icon="ic:baseline-home"
                    color="#de342f"
                    width="20"
                    height="20"
                  />
                  <p className="m-0 side-text">Home</p>
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
                className="nav-link"
                activeClassName="active"
                onClick={() => navigate("/facilities")}
              >
                {" "}
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger">
                    <Icon
                      icon="ri:home-gear-fill"
                      color="#de342f"
                      width="20"
                      height="20"
                    />
                    <p className="m-0 side-text">Facilities</p>
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
              <Link to="#" className="nav-link" aria-current="page">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger">
                    <Icon
                      icon="raphael:dollar"
                      color="#de342f"
                      width="20"
                      height="20"
                    />
                    <p className="m-0 side-text">Pricing</p>
                  </div>
                  <div className="text-muted">
                    <Icon
                      icon="iconamoon:arrow-right-2-light"
                      width="20"
                      height="20"
                    />
                  </div>
                </div>
              </Link>
            </li>
          )}

          {isCenterRoute && (
            <li className="nav-item">
              <Link to="#" className="nav-link" aria-current="page">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger">
                    <Icon
                      icon="lucide:list-todo"
                      color="#de342f"
                      width="20"
                      height="20"
                    />
                    <p className="m-0 side-text">Reservation</p>
                  </div>
                  <div className="text-muted">
                    <Icon
                      icon="iconamoon:arrow-right-2-light"
                      width="20"
                      height="20"
                    />
                  </div>
                </div>
              </Link>
            </li>
          )}

          {isCenterRoute && (
            <li className="nav-item">
              <Link to="#" className="nav-link" aria-current="page">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger">
                    <Icon
                      icon="ri:refund-2-line"
                      color="#de342f"
                      width="20"
                      height="20"
                    />
                    <p className="m-0 side-text">Refunds</p>
                  </div>
                  <div className="text-muted">
                    <Icon
                      icon="iconamoon:arrow-right-2-light"
                      width="20"
                      height="20"
                    />
                  </div>
                </div>
              </Link>
            </li>
          )}

          {isCenterRoute && (
            <li className="nav-item">
              <Link to="#" className="nav-link" aria-current="page">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger">
                    <Icon
                      icon="fa-solid:user-cog"
                      color="#de342f"
                      width="20"
                      height="20"
                    />
                    <p className="m-0 text-nowrap side-text">User Management</p>
                  </div>
                  <div className="text-muted">
                    <Icon
                      icon="iconamoon:arrow-right-2-light"
                      width="20"
                      height="20"
                    />
                  </div>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default SideMenu;
