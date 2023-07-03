import React from 'react';

function Footer({isOpen}) {
  return (
    <footer className={`footer ${
      isOpen ? "footer__nav-bar" : ""
    }`}
    >
      <p className="footer__text">© {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  );
};

export default Footer;
