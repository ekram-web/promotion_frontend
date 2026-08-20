import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import logo from "../../assets/images/Basirah Full Color Transparent.png";
import { FaDownload, FaTimes, FaBookOpen } from "react-icons/fa";
import { FiHome, FiInfo, FiGrid, FiMail } from "react-icons/fi";

const navLinks = [
  { name: "Home", href: "#hero", icon: <FiHome /> },
  { name: "About", href: "#about", icon: <FiInfo /> },
  { name: "What We Offer", href: "#offer", icon: <FiGrid /> },
  { name: "Contact", href: "#contact", icon: <FiMail /> },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Scrolled state for glass background styling
      setScrolled(currentScrollY > 10);

      // 2. Hide/Show header logic
      // Always visible at the absolute top of the page (<= 15px)
      if (currentScrollY <= 15) {
        setVisible(true);
      } else {
        const diff = currentScrollY - lastScrollY;
        if (diff > 5) {
          // Scrolling down -> hide header immediately!
          setVisible(false);
        } else if (diff < -5) {
          // Scrolling up -> show header!
          setVisible(true);
        }
      }

      lastScrollY = currentScrollY;

      // 3. Active section tracking for nav items
      const sections = ["hero", "about", "offer", "contact"];
      const scrollPosition = currentScrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
          !visible && !menuOpen ? styles.hidden : ""
        }`}
      >
        <div className={styles.container}>
          <a href="#" className={styles.logo}>
            <img src={logo} alt="Basirah Logo" />
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.navMenu}>
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={
                      activeSection === link.href.replace("#", "")
                        ? styles.activeLink
                        : ""
                    }
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Open Qur'an Icon Hamburger Toggle */}
          <button
            className={styles.menuIcon}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            title="Menu Toggle"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBookOpen size={25} />}
          </button>
        </div>
      </header>

      {/* Floating Glass Mobile Menu Dropdown */}
      {menuOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className={styles.floatingGlassMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.dropdownHeader}>
              <span className={styles.dropdownTag}>
                <FaBookOpen style={{ marginRight: 6, verticalAlign: "middle", fontSize: "0.9rem" }} />
                BASIRAH NAVIGATION
              </span>
            </div>

            <ul className={styles.mobileLinkList}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={isActive ? styles.activeMobileLink : ""}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      <span className={styles.mobileLinkIcon}>{link.icon}</span>
                      <span>{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className={styles.dropdownFooter}>
              <a
                href="#promote"
                className={styles.mobileCtaBtn}
                onClick={(e) => handleNavClick(e, "#promote")}
              >
                <FaDownload size={14} />
                <span>Get Mobile App</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
