import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import OrganizationInfo from "./Pages/OrgInfo";
import Facilities from "./Pages/Facilities";
import AddCenter from "./Pages/AddCenter";
import Center from "./Components/Center"
import NavbarHeader from "./Components/Navbar";
import SideMenu from "./Components/SideMenu";
import Reservations from "./Pages/Reservations";
import { Col, Row } from "react-bootstrap";
import AddFacilities from "./Pages/AddFacilities";
import Refunds from "./Pages/Refunds";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { createContext } from "react";
import { BookingProvider } from "./Components/BookingContext";
// import TestPage from "./Pages/TestPage";

export const BookingDataContext = createContext();

function App() {
  return (
    <div className="App">
      <BookingProvider>
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

        <Route path="/reservation" element={<Reservations/>}/>

        <Route path="/refunds" element={<Refunds/>}/>

        {/* <Route path="/new" element={<TestPage/>}/> */}

      </Routes>
        </Col>
        </Row>
        </BookingProvider>
    </div>
  );
}

export default App;