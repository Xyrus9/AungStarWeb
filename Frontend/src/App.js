import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet, useLocation } from "react-router-dom";
import Home from "./Home.js";
import About from "./About.js";
import ContactUs from "./ContactUs.js";
import ProductDetail from "./ProductDetail.js";
import ListProducts from "./admin/ListProducts.js";
import EditProducts from "./admin/EditProducts.js";
import CreateProducts from "./admin/CreateProducts.js";
import Login from "./admin/Login.js";
import Logout from "./admin/Logout.js";
import { isAdminAuthenticated, setAdminAuthenticated } from "./admin/adminAuth.js";
import "./App.css";

function ProtectedAdminRoute({ isLoggedIn }) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to='/admin/login' replace state={{ from: location }} />;
  }

  return <Outlet />;
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("theme");
    return stored === "dark" ? "dark" : "light";
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => isAdminAuthenticated());

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleAdminLoginSuccess = () => {
    setAdminAuthenticated(true);
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
    setIsAdminLoggedIn(false);
  };

  function AppLayout() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const shouldShowAdminLogout = isAdminRoute && isAdminLoggedIn && location.pathname !== '/admin/logout';

    return (
      <>
        <nav className="nav">
          <div className="brand">Aung Myay Treasure</div>

          <div className="nav-right">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <span className="toggle-label">{theme === "dark" ? "Light" : "Dark"} mode</span>
              <span className={`toggle-chip ${theme === "dark" ? "is-dark" : ""}`}></span>
            </button>

            {!isAdminRoute ? (
              <div className="nav-links">
                <Link to="/" className="link">
                  Home
                </Link>
                <Link to="/about" className="link">
                  About
                </Link>
                <Link to="/contactus" className="link">
                  Contact
                </Link>
              </div>
            ) : null}

            {shouldShowAdminLogout ? (
              <Link to="/admin/logout" className="nav-logout-btn">
                Log Out
              </Link>
            ) : null}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/admin/login' element={<Login onLoginSuccess={handleAdminLoginSuccess} />} />
          <Route element={<ProtectedAdminRoute isLoggedIn={isAdminLoggedIn} />}>
            <Route path="/admin" element={<ListProducts />} />
            <Route path="/admin/logout" element={<Logout onLogout={handleAdminLogout} />} />
            <Route path='/admin/product/:id/edit' element={<EditProducts />} />
            <Route path='/admin/product/create' element={<CreateProducts />} />
          </Route>
        </Routes>

        {!isAdminRoute ? (
          <footer className="footer">
            <div className="footer-inner">
              <div className="footer-brand">
                <p className="footer-logo">Aung Myay Treasure</p>
                <p className="footer-copy">
                  Fine gold, diamond, and heritage jewellery curated in Myanmar. Walk in or message us to reserve.
                </p>
              </div>

              <div className="footer-group">
                <p className="footer-title">Explore</p>
                <Link to="/" className="footer-link">Home</Link>
                <Link to="/about" className="footer-link">About</Link>
                <Link to="/contactus" className="footer-link">Contact</Link>
              </div>

              <div className="footer-group">
                <p className="footer-title">Visit & Call</p>
                <p className="footer-text">Yangon & Mandalay showrooms</p>
                <p className="footer-text">Phone: +95 9 000 000 000</p>
                <p className="footer-text">Email: hello@aungstargold.com</p>
              </div>

              <div className="footer-group">
                <p className="footer-title">Follow</p>
                <a className="footer-link" href="#" aria-label="Facebook">Facebook</a>
                <a className="footer-link" href="#" aria-label="Instagram">Instagram</a>
                <a className="footer-link" href="#" aria-label="Viber">Viber</a>
              </div>
            </div>

            <div className="footer-bottom">
              <p className="footer-bottom-text">&copy; {new Date().getFullYear()} Aung Myay Treasure. Crafted with care.</p>
            </div>
          </footer>
        ) : null}
      </>
    );
  }

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
