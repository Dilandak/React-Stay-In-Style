import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./IniciarSesion.css";

const IniciarSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMensaje("Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://backend-stay-in-style.onrender.com/login", {
        email,
        password,
      });

      const { token, usuario } = response.data;

      // Guardar datos en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("id_usuario", usuario.id);
      localStorage.setItem("nombre_usuario", usuario.nombre);
      localStorage.setItem("email_usuario", usuario.email);
      localStorage.setItem("direccion_usuario", usuario.direccion);
      localStorage.setItem("userRole", usuario.id_rol);

      // Determinar el tipo de usuario y redireccionar
      let redirectPath = "/";
      let roleMessage = "usuario";

      if (usuario.id_rol === 1) {
        redirectPath = "/Administrador";
        roleMessage = "administrador";
      } else if (email === "superadmin@example.com" && password === "superadmin123") {
        localStorage.setItem("isSuperAdmin", "true");
        redirectPath = "/Administrador";
        roleMessage = "SuperAdmin";
      }

      setMensaje(`¡Inicio de sesión exitoso como ${roleMessage}! Redirigiendo...`);

      // Redirección después de 1.5 segundos
      setTimeout(() => {
        navigate(redirectPath);
        window.location.reload();
      }, 1500);

    } catch (error) {
      setMensaje(
        error.response?.data?.mensaje ||
        "Error al iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5", minHeight: "100vh", padding: "20px" }}>
      <div className="auth-page-container">
        <div className="auth-container">
          <h2>Inicia Sesión</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Ingresa tu correo"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <div className="show-password">
              <input
                type="checkbox"
                id="showPassword"
                onChange={togglePasswordVisibility}
              />
              <label htmlFor="showPassword">Mostrar contraseña</label>
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Iniciando sesión...
                </>
              ) : "Iniciar Sesión"}
            </button>
          </form>

          {mensaje && (
            <div className={`auth-message ${mensaje.includes("éxito") ? "success" : "error"}`}>
              {mensaje}
            </div>
          )}

          <div className="auth-links">
            <Link to="/ForgotPassword">¿Olvidaste tu contraseña?</Link>
            <p>¿No tienes cuenta? <Link to="/Registro">Regístrate</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
