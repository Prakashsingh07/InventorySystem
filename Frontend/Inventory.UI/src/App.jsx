import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Suppliers from './pages/Suppliers';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import AddSupplier from './pages/AddSupplier';
import StockAdjustment from "./pages/StockAdjustment";
import StockHistory from "./pages/StockHistory";
import PurchaseOrders from "./pages/PurchaseOrders";
import AddPurchaseOrder from "./pages/AddPurchaseOrder";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />

                <Route path='/dashboard' element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />

                <Route path='/products' element={
                    <ProtectedRoute><Products /></ProtectedRoute>
                } />

                <Route path='/products/add' element={
                    <ProtectedRoute><AddProduct /></ProtectedRoute>
                } />

                <Route path='/products/edit/:id' element={
                    <ProtectedRoute><EditProduct /></ProtectedRoute>
                } />

                <Route path='/suppliers' element={
                    <ProtectedRoute><Suppliers /></ProtectedRoute>
                } />

                <Route path='/suppliers/add' element={
                    <ProtectedRoute><AddSupplier /></ProtectedRoute>
                } />

                <Route path="/stock-adjustment" element={
                    <ProtectedRoute> <StockAdjustment /> </ProtectedRoute>
                } />

                <Route path="/stock-history/:id" element={
                    <ProtectedRoute> <StockHistory /> </ProtectedRoute>
                      }/>
                      <Route path="/purchase-orders" element={
                        <ProtectedRoute> <PurchaseOrders /> </ProtectedRoute> }/>

                <Route path="/purchase-orders/add" element={
                        <ProtectedRoute> <AddPurchaseOrder /> </ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;