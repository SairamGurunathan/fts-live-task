import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';


function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Login/>}/>

      <Route path='/center' element={<Home/>}/>
     </Routes>
    </div>
  );
}

export default App;