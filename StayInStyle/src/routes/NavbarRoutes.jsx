import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Importar los componentes de las páginas
import Home from '../pages/Home/Home';
import Registro from '../pages/Registro/Registro';
import IniciarSesion from '../pages/iniciarSesion/iniciarSesion';
import Administrador from '../pages/Administrador/Administrador';
import Comprar from '../pages/Usuarios/Comprar/Comprar';
import Carrito from '../pages/Usuarios/Carrito/Carrito';
import Categoriash from "../pages/Usuarios/Categorias/Categoriash/Categoriash";
import Categoriasm from "../pages/Usuarios/Categorias/Categoriasm/Categoriasm";
import AdminUsuarios from '../pages/Administradores/adminUsuarios/adminUsuarios';
import AdminProductos from '../pages/Administradores/AdminProductos/AdminProductos';
import AdminPedidos from '../pages/Administradores/AdminPedidos/AdminPedidos';
import QueEsStayInStyle from "../pages/Usuarios/sobre_nosotros/QueEsStayInStyle";
import QuienesSomos from "../pages/Usuarios/sobre_nosotros/QuienesSomos";
import ForgotPassword from '../components/Auth/ForgotPassword';
import ResetPasswordPage from '../components/Auth/ResetPasswordPage';
import DetalleProducto from "../pages/Productos/DetalleProducto";
import Confirmacion from "../pages/Usuarios/Comprar/Confirmación";
import AdminReseñas from "../pages/Administradores/AdminReseñas/AdminReseñas";
import AdminStock from "../pages/Administradores/AdminStock/Adminstock"
import HistorialCompras from "../pages/Usuarios/Comprar/HistorialCompras"
import Pedido from "../pages/Usuarios/Comprar/Pedido"

// Componente para proteger rutas
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const userRole = parseInt(localStorage.getItem('userRole'));
  const isAuthenticated = localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/IniciarSesion" replace />;
  }
  
  if (adminOnly && userRole !== 1) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const NavbarRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas (accesibles sin login) */}
      <Route path="/" element={<Home />} />
      <Route path="/Registro" element={<Registro />} />
      <Route path="/IniciarSesion" element={<IniciarSesion />} />
      <Route path="/ForgotPassword" element={<ForgotPassword/>} />
      <Route path="/ResetPasswordPage/:token" element={<ResetPasswordPage />} />
      <Route path="/Usuarios/sobre_nosotros/QueEsStayInStyle" element={<QueEsStayInStyle />} />
      <Route path="/Usuarios/sobre_nosotros/QuienesSomos" element={<QuienesSomos />} />
      <Route path="/productos/:id" element={<DetalleProducto />} />

      {/* Rutas protegidas (requieren login) */}
      <Route path="/Carrito" element={
       
          <Carrito />
       
      } />
      <Route path="Usuarios/Comprar" element={
        <ProtectedRoute>
          <Comprar />
        </ProtectedRoute>
      } />
      <Route path="/Usuarios/Categorias/Categoriash" element={

          <Categoriash />
    
      } />
      <Route path="/Usuarios/Categorias/Categoriasm" element={
       
          <Categoriasm />
      
      } />
      <Route path="/Confirmación" element={
        <ProtectedRoute>
          <Confirmacion/>
        </ProtectedRoute>
      } />
      <Route path="/historial-compras" element={
        <ProtectedRoute>
          <HistorialCompras />
        </ProtectedRoute>
      } />
      <Route path="/pedido" element={
        <ProtectedRoute>
          <Pedido />
        </ProtectedRoute>
      } />

      {/* Rutas de administrador (requieren login Y rol admin) */}
      <Route path="/Administrador" element={
        <ProtectedRoute adminOnly>
          <Administrador />
        </ProtectedRoute>
      } />
      <Route path="/Administradores/adminUsuarios" element={
        <ProtectedRoute adminOnly>
          <AdminUsuarios />
        </ProtectedRoute>
      } />
      <Route path="/Administradores/adminproductos" element={
        <ProtectedRoute adminOnly>
          <AdminProductos />
        </ProtectedRoute>
      } />
      <Route path="/Administradores/AdminPedidos" element={
        <ProtectedRoute adminOnly>
          <AdminPedidos />
        </ProtectedRoute>
      } />
      <Route path="/Administradores/AdminReseñas" element={
        <ProtectedRoute adminOnly>
          <AdminReseñas />
        </ProtectedRoute>
      } />
      <Route path="/Administradores/Adminstock" element={
        <ProtectedRoute adminOnly>
          <AdminStock/>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default NavbarRoutes;