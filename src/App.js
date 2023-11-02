import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddCenter from "./Pages/AddCenter";
import OrganizationInfo from "./Pages/OrgInfo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/center" element={<Home />} />

        <Route path="/addcenter" element={<AddCenter />} />

        <Route path="/organizationinfo" element={<OrganizationInfo />} />
      </Routes>
    </div>
  );
}

export default App;