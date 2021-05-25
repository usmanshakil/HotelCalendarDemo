import React from "react";
import { Link } from "react-router-dom"
const Sidebar = () => {

    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Hotel Rooms</div>
                        <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                 Hotel Rooms
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to="/calender" className="nav-link" >Calendar</Link>
                                <Link to="/" className="nav-link" >Calendar 2nd Sample </Link>

                            </nav>
                        </div>

                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Hotel Calendar</div>
                </div>
            </nav>
        </div>

    );
};
export default Sidebar;
