import React from 'react';
import headerLogo from '../images/logo_mesto.svg';
import {Link, useLocation} from 'react-router-dom';

function Header({
  emailUser,
  handleLogOut,
  handlOpenNav,
  isOpen
  }) {

  const location = useLocation();

  return (
    <header className={`header ${
      isOpen ? "header_open" : ""
    }`}
    >
      <img
        src={headerLogo}
        className="header__logo"
        alt="логотип Russia"
      />
      <nav className="header__nav"
      >
        {location.pathname === "/" &&
          <>
            <p className='header__nav-text'>{emailUser}</p>
            <p className='header__nav-link'onClick={handleLogOut}>Выйти</p>
          </>
        }
      </nav>
      {location.pathname === "/signup" && <Link to="/signin" className="header__nav-link header__nav-link_sing">Войти</Link>}
      {location.pathname === "/signin" && <Link to="/signup" className="header__nav-link header__nav-link_sing">Регистрация</Link>}
      {location.pathname === "/" &&
        <>
          <button
            className={`header__burger-btn ${
              isOpen ? "header__burger-btn_open" : ""
            }`}
            onClick={handlOpenNav}
          >
            <span ></span><span ></span><span ></span>
          </button>
        </>}
    </header>
  );
};

export default Header;
