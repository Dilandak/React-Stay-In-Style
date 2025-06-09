// ✅ Footer.jsx actualizado para producción y rutas con HashRouter
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

import facebookImg from '../../assets/Imagenes/facebook.jpg';
import instagramImg from '../../assets/Imagenes/instragram.jpg';
import tiktokImg from '../../assets/Imagenes/tiktok.jpg';

const Footer = () => {
  return (
    <footer>
      <div className="footer-section">
        <h3>SOBRE NOSOTROS</h3>
        <ul>
          <li><Link to="/Usuarios/sobre_nosotros/QuienesSomos">¿Quiénes somos?</Link></li>
          <li><Link to="/Usuarios/sobre_nosotros/QueEsStayInStyle">¿Qué es Stay in Style?</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>NUESTRAS CATEGORÍAS</h3>
        <ul>
          <li><Link to="/Usuarios/Categorias/Categoriash">Hombre</Link></li>
          <li><Link to="/Usuarios/Categorias/Categoriasm">Mujer</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>SÍGUENOS</h3>
        <ul className="social-media">
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebookImg} alt="Facebook" /></a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src={instagramImg} alt="Instagram" /></a></li>
          <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><img src={tiktokImg} alt="TikTok" /></a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
