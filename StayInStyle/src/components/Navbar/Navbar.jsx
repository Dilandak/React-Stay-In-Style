import React, { useEffect, useState } from "react";
import "./Navbar.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    nombre: "",
    rol: null,
    isSuperAdmin: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nombre = localStorage.getItem("nombre_usuario");
    const rol = localStorage.getItem("userRole");
    const isSuperAdmin = localStorage.getItem("isSuperAdmin") === "true";

    if (token) {
      setUserData({
        isLoggedIn: true,
        nombre: nombre || "",
        rol: rol ? parseInt(rol) : null,
        isSuperAdmin
      });
    } else {
      setUserData({
        isLoggedIn: false,
        nombre: "",
        rol: null,
        isSuperAdmin: false
      });
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.clear();
    setUserData({
      isLoggedIn: false,
      nombre: "",
      rol: null,
      isSuperAdmin: false
    });
    navigate("/");
    window.location.reload();
  };

  // Navbar para SuperAdmin
  if (userData.isSuperAdmin) {
    return (
      <header className="superadmin-header">
        <div className="logo-container">
          <Link to="/Administrador" className="logo-link">
            <img
              src="/src/assets/Imagenes/Stay_In_Style.png"
              alt="Logo"
              className="logo-image"
            />
            <span className="logo-text">Stay in Style</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li className="nombre-usuario">
              <i className="fas fa-crown"></i> Hola: {userData.nombre}
            </li>
            <li>
              <button className="cerrar-sesion-btn" onClick={cerrarSesion}>
                <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
              </button>
            </li>
          </ul>
        </nav>
      </header>
    );
  }

  // Navbar para admin normal (rol 1)
  if (userData.isLoggedIn && userData.rol === 1) {
    return (
      <header className="admin-header">
        <div className="logo-container">
          <Link to="/Administrador" className="logo-link">
            <img
              src="/src/assets/Imagenes/Stay_In_Style.png"
              alt="Logo"
              className="logo-image"
            />
            <span className="logo-text">Stay in Style</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/Administrador">
                <i className="fas fa-home"></i> Inicio Admin
              </Link>
            </li>
            <li className="nombre-usuario">
              <i className="fas fa-user-shield"></i> Admin: {userData.nombre}
            </li>
            <li>
              <button className="cerrar-sesion-btn" onClick={cerrarSesion}>
                <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
              </button>
            </li>
          </ul>
        </nav>
      </header>
    );
  }

  // Navbar para usuario normal (rol 2)
  if (userData.isLoggedIn) {
    return (
      <header>
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img
              src="/src/assets/Imagenes/Stay_In_Style.png"
              alt="Logo"
              className="logo-image"
            />
            <span className="logo-text">Stay in Style</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <i className="fas fa-home"></i> Inicio
              </Link>
            </li>
            <li>
              <Link to="/historial-compras">
                <i className="fas fa-receipt"></i> Historial de compras
              </Link>
            </li>
            <li>
              <Link to="/Pedido">
                <i className="fas fa-truck"></i> Mi Pedido
              </Link>
            </li>
            <li>
              <Link to="/Carrito">
                <i className="fas fa-shopping-cart"></i> Carrito
              </Link>
            </li>
            <li>
              <span>
                <i className="fas fa-th-large"></i> Categorías
              </span>
              <ul>
                <li>
                  <Link to="/Usuarios/Categorias/Categoriash">Hombre</Link>
                </li>
                <li>
                  <Link to="/Usuarios/Categorias/Categoriasm">Mujer</Link>
                </li>
              </ul>
            </li>
            <li className="nombre-usuario">Hola, {userData.nombre}</li>
            <li>
              <button className="cerrar-sesion-btn" onClick={cerrarSesion}>
                <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
              </button>
            </li>
          </ul>
        </nav>
      </header>
    );
  }

  // Navbar para no logueados
  return (
    <header>
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img
            src="/src/assets/Imagenes/Stay_In_Style.png"
            alt="Logo"
            className="logo-image"
          />
          <span className="logo-text">Stay in Style</span>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <i className="fas fa-home"></i> Inicio
            </Link>
          </li>
          <li>
            <Link to="/IniciarSesion">
              <i className="fas fa-user"></i> Iniciar Sesión
            </Link>
          </li>
          <li>
            <Link to="/Registro">
              <i className="fas fa-user-plus"></i> Registrarse
            </Link>
          </li>
          <li>
            <Link to="/Carrito">
              <i className="fas fa-shopping-cart"></i> Carrito
            </Link>
          </li>
          <li>
            <span>
              <i className="fas fa-th-large"></i> Categorías
            </span>
            <ul>
              <li>
                <Link to="/Usuarios/Categorias/Categoriash">Hombre</Link>
              </li>
              <li>
                <Link to="/Usuarios/Categorias/Categoriasm">Mujer</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
