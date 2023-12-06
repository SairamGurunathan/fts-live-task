import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-loading-skeleton/dist/skeleton.css';
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import OrganizationInfo from "./Pages/OrgInfo";
import Facilities from "./Pages/Facilities";
import AddCenter from "./Pages/AddCenter";
import Center from "./Components/Center"
import NavbarHeader from "./Components/Navbar";
import SideMenu from "./Components/SideMenu";
import { Col, Row } from "react-bootstrap";
import AddFacilities from "./Pages/AddFacilities";
import Refunds from "./Pages/Refunds";

function App() {
  return (
    <div className="App">
      {window.location.pathname !== '/' && <NavbarHeader/>}
      <Row className='w-100 h-100 m-0'>
            <Col lg={window.location.pathname !== '/' ? 0 : 2} md={window.location.pathname !== '/' ? 0 : 2} sm={window.location.pathname !== '/' ? 0 : 2} className='p-0'>
            {window.location.pathname !== '/' && <SideMenu/>}
            </Col>
            <Col lg={window.location.pathname === '/' ? 12 : 10}  md={window.location.pathname === '/' ? 12 : 10} sm={window.location.pathname === '/' ? 12 : 10} className='p-0 form-login h-100 m-0'>
            
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/center" element={<Center/>} />

        <Route path="/addcenter" element={<AddCenter/>} />

        <Route path="/organizationinfo" element={<OrganizationInfo />} />

        <Route path="/addfacilities" element={<AddFacilities/>}/>

        <Route path="/facilities" element={<Facilities/>}/>

        <Route path="/refunds" element={<Refunds/>}/>
      </Routes>
        </Col>
        </Row>
    </div>
  );
}

export default App;