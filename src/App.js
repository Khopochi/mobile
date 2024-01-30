import logo from './logo.svg';
import './App.css';
import Layout from './mainpage/Layout';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Category from './pages/category/Category';
import Deepcategory from './pages/deepcategory/Deepcategory';
import Viewproduct from './pages/viewproduct/Viewproduct';
import { Register } from './pages/register/Register';
import { Login } from './pages/login/Login';
import Cart from './pages/cart/Cart';
import Productsearch from './pages/search/Productsearch';
import Categorysearch from './pages/search/Categorysearch';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/register/' element={<Register/>} />
          <Route path='/cart/' element={<Cart/>} />
          <Route path='/login/' element={<Login />} />
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='/categories/' element={<Category/> } />
            <Route path='/deepcategories'>
              <Route path=':id/:name' element={<Deepcategory/>} />
            </Route>
            
          </Route>
          <Route path='/viewproduct'>
              <Route path=':id' element={<Viewproduct />} />
          </Route>
          <Route path='/search'>
              <Route path=':id' element={<Productsearch />} />
          </Route>
          <Route path='/categories'>
              <Route path=':id' element={<Categorysearch />} />
          </Route>
          
        </Routes>
    </BrowserRouter>
  );
}

export default App;
