import React, { useEffect, useState } from "react";
import "./Navbar.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/Imagenes/Stay_In_Style.png"; // ✅ Import del logo

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

  const logoImg = (
    <Link to="/" className="logo-link">
      <img src={logo} alt="Logo" className="logo-image" />
    </Link>
  );

  if (userData.isSuperAdmin || (userData.isLoggedIn && userData.rol === 1)) {
    return (
      <header className={userData.isSuperAdmin ? "superadmin-header" : "admin-header"}>
        <div className="logo-container">{logoImg}</div>
        <nav>
          <ul>
            {userData.isSuperAdmin ? (
              <li className="nombre-usuario">
                <i className="fas fa-crown"></i> Hola: {userData.nombre}
              </li>
            ) : (
              <>
                <li>
                  <Link to="/Administrador">
                    <i className="fas fa-home"></i> Inicio Admin
                  </Link>
                </li>
                <li className="nombre-usuario">
                  <i className="fas fa-user-shield"></i> Admin: {userData.nombre}
                </li>
              </>
            )}
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

  return (
    <header>
      <div className="logo-container">{logoImg}</div>
      <nav>
        <ul>
          <li><Link to="/"><i className="fas fa-home"></i> Inicio</Link></li>
          {userData.isLoggedIn ? (
            <>
              <li><Link to="/historial-compras"><i className="fas fa-receipt"></i> Historial</Link></li>
              <li><Link to="/Pedido"><i className="fas fa-truck"></i> Pedido</Link></li>
              <li><Link to="/Carrito"><i className="fas fa-shopping-cart"></i> Carrito</Link></li>
              <li>
                <span><i className="fas fa-th-large"></i> Categorías</span>
                <ul>
                  <li><Link to="/Usuarios/Categorias/Categoriash">Hombre</Link></li>
                  <li><Link to="/Usuarios/Categorias/Categoriasm">Mujer</Link></li>
                </ul>
              </li>
              <li className="nombre-usuario">Hola, {userData.nombre}</li>
              <li>
                <button className="cerrar-sesion-btn" onClick={cerrarSesion}>
                  <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/IniciarSesion"><i className="fas fa-user"></i> Iniciar Sesión</Link></li>
              <li><Link to="/Registro"><i className="fas fa-user-plus"></i> Registrarse</Link></li>
              <li><Link to="/Carrito"><i className="fas fa-shopping-cart"></i> Carrito</Link></li>
              <li>
                <span><i className="fas fa-th-large"></i> Categorías</span>
                <ul>
                  <li><Link to="/Usuarios/Categorias/Categoriash">Hombre</Link></li>
                  <li><Link to="/Usuarios/Categorias/Categoriasm">Mujer</Link></li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
