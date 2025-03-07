import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const NavBar = ({ darkMode, toggleMode }) => {

  const scrollToSection = (id, offset) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
        <a href="#home" onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" onClick={(e) => {
            e.preventDefault();
            scrollToSection('about', -300);
          }}>
            About
          </a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact', 100);
          }}>
            Contact
          </a>
        </li>
        {/* <button 
          onClick={toggleMode}
          className="mode-toggle"
          style={{ width: '24px', height: 'auto' }}
        >
          {darkMode ? <img src="sun.svg" alt="Light mode" /> : <img src="moon.svg" alt="Dark mode" />}
        </button> */}
      </ul>
    </nav>
  );
};

export default NavBar;