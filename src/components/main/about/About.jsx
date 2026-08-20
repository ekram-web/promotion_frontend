import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";
import aboutImg from "../../../assets/images/ustaz/about.JPG";
import logoMark from "../../../assets/images/Basirah Logo Full Color(Transparent).png";
import { fetchAbout } from "../../../api/about";
import { FaBookOpen, FaUserGraduate, FaGlobe } from "react-icons/fa";

export default function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetchAbout()
      .then((res) => setAboutData(res.data))
      .catch(() => setAboutData(null));
  }, []);

  const features = [
    {
      icon: <FaBookOpen />,
      title: "Authentic Qur'anic Scholarship",
      desc: "Rooted in traditional Islamic scholarship, delivered with precision and clarity.",
    },
    {
      icon: <FaUserGraduate />,
      title: "Certified Scholar Mentorship",
      desc: "Learn directly under qualified teachers dedicated to your personal spiritual growth.",
    },
    {
      icon: <FaGlobe />,
      title: "Global Learning Community",
      desc: "Connect with dedicated students worldwide in an encouraging, peaceful environment.",
    },
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Left Column: Scholar Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.imageWrapper}
        >
          <div className={styles.archedCard}>
            <img
              src={
                aboutData && aboutData.image
                  ? `https://besirad.basirahtv.com/storage/${aboutData.image}`
                  : aboutImg
              }
              alt="About Basirah Institute"
              className={styles.aboutImage}
            />
            <div className={styles.imageOverlayGlow} />
            <div className={styles.badgeOverlay}>
              <img
                src={logoMark}
                alt="Basirah Logo"
                className={styles.badgeLogo}
              />
              <div>
                <p className={styles.badgeTitle}>Basirah Institute</p>
                <p className={styles.badgeSub}>Est. Qur'anic Excellence</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Clean Narrative & Features */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.contentBox}
        >
          <div className={styles.subTag}>WHO WE ARE</div>

          <h2 className={styles.mainTitle}>
            {aboutData && aboutData.title && aboutData.title !== "WHO WE ARE"
              ? aboutData.title
              : "Bridging Authentic Tradition with Modern Qur'anic Learning"}
          </h2>

          <p className={styles.description}>
            {aboutData && aboutData.description
              ? aboutData.description
              : "Basirah Institute is a leading Qur'anic education platform dedicated to empowering students worldwide with authentic knowledge, certified scholars, and interactive digital tools."}
          </p>

          {/* Sleek Feature Bullets */}
          <div className={styles.featureList}>
            {features.map((feat, idx) => (
              <div key={idx} className={styles.featureItem}>
                <div className={styles.featureIcon}>{feat.icon}</div>
                <div className={styles.featureInfo}>
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
