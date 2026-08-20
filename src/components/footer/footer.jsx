import React, { useEffect, useState } from "react";
import styles from "./footer.module.css";
import logo from "../../assets/images/Basirah Full Color Transparent.png";
import skylink from "../../assets/images/logo.png";
import { FaFacebookF, FaTiktok, FaYoutube, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { fetchContactInfo } from "../../api/contactInfo";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About Us", href: "#about" },
  { name: "What We Offer", href: "#offer" },
  // { name: "How It Works", href: "#how" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
];

function Footer() {
  const [footerData, setfooterData] = useState(null);

  useEffect(() => {
    fetchContactInfo()
      .then((res) => setfooterData(res.data))
      .catch(() => setfooterData(null));
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Background Watermark */}
      <div className={styles.calligraphyWatermark} aria-hidden="true">
        بصيرة
      </div>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <img src={logo} alt="Basirah Institute Logo" className={styles.footerLogo} />
            <p className={styles.brandDesc}>
              Empowering learners worldwide with authentic Qur'anic knowledge, expert scholars, and innovative digital tools.
            </p>
            <div className={styles.poweredBy}>
              <span>Powered by</span>
              <img src={skylink} alt="Skylink Logo" className={styles.partnerLogo} />
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Navigation</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Institute Info</h4>

            <div className={styles.infoRow}>
              <FaMapMarkerAlt className={styles.infoIcon} />
              <span>
                {footerData && footerData.address
                  ? footerData.address
                  : "Betel , Apple Plaza , 4th floor"}
              </span>
            </div>

            <div className={styles.infoRow}>
              <FaPhoneAlt className={styles.infoIcon} />
              <span>{footerData && footerData.phone ? footerData.phone : " 09 94 48 18 71"}</span>
            </div>

            <div className={styles.socialsRow}>
              <a
                href="https://www.facebook.com/khalidkibrom99"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.socialBtn}
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.tiktok.com/@ustaz.khalid.kibr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className={styles.socialBtn}
              >
                <FaTiktok />
              </a>
              <a
                href="https://www.youtube.com/@UstazKhalidKibromBasirahOffici"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className={styles.socialBtn}
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Basirah Institute for Qur'anic Studies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
