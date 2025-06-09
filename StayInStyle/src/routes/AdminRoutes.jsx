import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Administrador from "../pages/Administrador/Administrador";
import AdminUsuarios from "../pages/Administradores/adminUsuarios/adminUsuarios";
import AdminProductos from "../pages/Administradores/adminproductos/adminproductos";
import AdminStock from "../pages/Administradores/AdminStock/Adminstock";

// Componente de protección de rutas (añadido en el mismo archivo)
const ProtectedRoute = ({ children }) => {
  const userRole = parseInt(localStorage.getItem('userRole'));
  const isAuthenticated = localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== 1) { // Solo rol 1 (admin) puede acceder
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Ruta principal del administrador */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Administrador />
          </ProtectedRoute>
        } 
      />

      {/* Ruta para la gestión de usuarios */}
      <Route 
        path="/adminUsuarios" 
        element={
          <ProtectedRoute>
            <AdminUsuarios />
          </ProtectedRoute>
        } 
      />

      {/* Ruta para la gestión de productos */}
      <Route 
        path="/adminproductos" 
        element={
          <ProtectedRoute>
            <AdminProductos />
          </ProtectedRoute>
        } 
      />

      {/* Ruta para la gestión de pedidos */}
      <Route 
        path="/adminpedidos" 
        element={
          <ProtectedRoute>
            <AdminPedidos />
          </ProtectedRoute>
        } 
      />

      {/* Ruta simple para AdminStock */}
      <Route 
        path="/admin/stock" 
        element={
          <ProtectedRoute>
            <AdminStock />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AdminRoutes;