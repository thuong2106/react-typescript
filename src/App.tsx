import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectRouter from './ProtectRouter'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProductDetail from './pages/ProductDetail'
import Sigin from './pages/Signin'
import ProductAdd from './pages/admin/ProductAdd'
import ProductEdit from './pages/admin/ProductEdit'
import ProductListPage from './pages/admin/ProductList'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<ProductDetail />} />
        <Route
          path='/admin/products'
          element={
            <ProtectRouter>
              <ProductListPage />
            </ProtectRouter>
          }
        />
        <Route path='/admin/products/create' element={<ProductAdd />} />
        <Route path='/admin/products/:id' element={<ProductEdit />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Sigin />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
