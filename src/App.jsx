import {Routes,Route} from 'react-router-dom';
// css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// pages
import Register from './pages/Register';
import List from './pages/List';
import Login from './pages/Login';
import Navebar from './components/Navebar';
import Home from './pages/Home';

function App() {
  return (
    <div className="">
      <Navebar/>
      <Routes>
        <Route index element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='list' element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
