import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Main } from './Components/Home/Main/main';
import { Signup } from './Components/Basics/signup';
import { Login } from './Components/Basics/login';
import { Activate } from './Components/Basics/Activate';
import { Reset } from './Components/Basics/reset';
import { Forgot } from './Components/Basics/forgot';
import { AllUsers } from './Components/Basics/AllUsers';
import { AdminProductList } from './Components/Admin/Products/AdminProductList';
import { CreateProduct } from './Components/Admin/Products/CreatePrdouct';
import { UpdateProduct } from './Components/Admin/Products/UpdateProduct';
import { ViewProduct } from './Components/Admin/Products/ViewProduct';
import { ViewOrder } from './Components/Order/Address/ViewOrder';
import { Orderlist } from './Components/Order/Address/Orderlist';
import { Cart } from './Components/Order/Cart/Cart';
import { MyOrderList } from './Components/Order/MyOrder/MyOrderList';
import { Address } from './Components/Order/Address/Address';
import { Editaddress } from './Components/Order/Address/Editaddress';
import { AdminDashboard } from './Components/Admin/Dashboard/Dashboard';
import { OrderSummary } from './Components/Order/OrderSummary';
import { UpdateOrder } from './Components/Order/Address/UpdateOrder';
import { AdminProductView } from './Components/Admin/Products/AdminProductView';


function App() {
  return (
    <div className = "App">
      <BrowserRouter>
       
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/register' element={<Signup/>}/>
          <Route path='/activate/:activeToken' element={<Activate/>}/>
          <Route  path='/forgot' element={<Forgot/>}/>
          <Route  path='/reset/:resetToken' element={<Reset/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
          <Route path='/admin/list-products' element={<AdminProductList/>}/>
          <Route path='/admin/list-users' element={<AllUsers/>}/>
          <Route path='/view-order/:id' element={<ViewOrder/>}/>
          <Route path='/admin/create-product' element={<CreateProduct/>}/>
          <Route path='/admin/edit-product/:id' element={<UpdateProduct/>}/>
          <Route path='/admin/list-orders' element={<Orderlist/>}/>
          <Route path='/admin/view-product/:id' element={<AdminProductView/>}/>
          <Route path='/view-product/:id' element={<ViewProduct/>}/>
          <Route path='/view-cart' element={<Cart/>}/>
          <Route path='/myorder-list' element={<MyOrderList/>}/>
          <Route path='/address' element={<Address/>}/>
          <Route path='/edit-address/:id' element={<Editaddress/>}/>
          <Route path='/order-summary/:id' element={<OrderSummary/>}/>
          <Route path='/update-order-status/:id' element={<UpdateOrder/>}/>

          
        

         
          
          
        </Routes>
       
      </BrowserRouter>

    </div>
    
  );
}

export default App;
