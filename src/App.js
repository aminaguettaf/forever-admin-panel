import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Orders from './pages/orders/Orders';
import AddItems from './pages/addItems/AddItems';
import ListItems from './pages/listItems/ListItems';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Login from './pages/login/Login';
import { useEffect, useState } from 'react';
import {ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  const[token,setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):'');
  useEffect(()=>{
    localStorage.setItem('token', token);
  },[token])
  return (
    <div>
      <ToastContainer />
      {token === '' ?
        <Login setToken={setToken}/>:
        <BrowserRouter>
        <Navbar setToken={setToken}/>
        <div className='d-flex'>
          <Sidebar />
          <Routes>
            <Route path='/orders' element={<Orders token={token}/>}/>
            <Route path='/add-items' element={<AddItems token={token}/>}/>
            <Route path='/list-items' element={<ListItems token={token}/>}/>
          </Routes>
        </div>
      </BrowserRouter>
      }
    </div>
  );
}

export default App;
// const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <BrowserRouter>
//       {isAuthenticated ? (
//         <>
//           <Navbar />
//           <div className='d-flex'>
//             <Sidebar />
//             <Routes>
//               <Route path='/orders' element={<Orders/>}/>
//               <Route path='/add-items' element={<AddItems/>}/>
//               <Route path='/list-items' element={<ListItems />}/>
//               <Route path="*" element={<Navigate to="/orders" />} />
//             </Routes>
//           </div>
//         </>
//       ) : (
//         <Routes>
//           <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       )}
//     </BrowserRouter>