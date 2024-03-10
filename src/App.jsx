import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// pages
import Register from './pages/Register';
import List from './pages/List';
import Login from './pages/Login';
import Navebar from './components/Navebar';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';

function App() {
  return (
    <div className="">
      <Navebar/>
      <Routes>
        <Route path="/bookloot" element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/list' element={<List />} />
        <Route path="/books/:bookId" element={<BookDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
      </Routes>
    </div>
  );
}

export default App;
