import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./promote.module.css";
import qrImg from "../../../assets/images/qr.jpg";
import skylink from "../../../assets/images/logo.png";
import realPhoneFrame from "../../../assets/images/real_phone_frame_clean.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { fetchPromotions } from "../../../api/promotion";
import promoVideo from "../../../assets/video.mp4";
import { FaStar, FaVideo, FaDownload, FaCheckCircle } from "react-icons/fa";

function Promotion() {
  const [promotion, setPromotion] = useState(null);

  useEffect(() => {
    fetchPromotions()
      .then((res) => {
        setPromotion(Array.isArray(res.data) ? res.data[0] : res.data);
      })
      .catch(() => setPromotion(null));
  }, []);

  return (
    <section className={styles.promotionSection} id="promote">
      {/* Background Ambient Orbs */}
      <div className={styles.orbLeft} />
      <div className={styles.orbRight} />

      <div className={styles.container}>
        {/* Left Column: Headlines & Integrated Dual Glass Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={styles.promoLeft}
        >
          <div className={styles.sectionBadge}>
            <span className={styles.pulseDot} />
            <span>MOBILE EXPERIENCE</span>
          </div>

          <h2 className={styles.promoHeadline}>
            Learn Qur'an on the Go with{" "}
            <span className={styles.gradientAccent}>Basirah App</span>
          </h2>

          <p className={styles.promoBenefit}>
            {promotion
              ? promotion.subtitle ||
                "Experience seamless learning, live circles, and offline Quran recitation tracking anytime, anywhere."
              : "Experience seamless learning, live circles, and offline Quran recitation tracking anytime, anywhere."}
          </p>

          <div className={styles.downloadCardRow}>
            {/* Card 1: Google Play */}
            <a
              href={
                promotion
                  ? promotion.play_store_url
                  : "https://play.google.com/store/apps/details?id=com.basirahtv.app"
              }
              target="_blank"
              rel="noopener noreferrer"
              className={styles.appBadgeBtn}
            >
              <FontAwesomeIcon
                icon={faGooglePlay}
                className={styles.badgeCardIcon}
              />
              <div className={styles.badgeTextCol}>
                <div className={styles.badgeTitleRow}>
                  <span className={styles.badgeMainText}>Google Play</span>
                  <FaDownload className={styles.badgeDlIcon} />
                </div>
                <span className={styles.badgeSubText}>Tap to install</span>
              </div>
            </a>

            {/* Card 2: App Store (Coming Soon) */}
            <div className={`${styles.appBadgeBtn} ${styles.disabledBadge}`}>
              <div className={styles.comingSoonFloating}>Soon</div>
              <FontAwesomeIcon
                icon={faApple}
                className={styles.badgeCardIconWhite}
              />
              <div className={styles.badgeTextCol}>
                <div className={styles.badgeTitleRow}>
                  <span className={styles.badgeMainText}>App Store</span>
                </div>
                <span className={styles.badgeSubText}>Coming Soon</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Real Phone Mockup Frame Overlay & 3 Scattered Pills */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={styles.promoRight}
        >
          <div className={styles.orbitStage}>
            {/* Top Pills Group (Mobile Flex Row / Desktop Orbit) */}
            <div className={styles.topPillGroup}>
              {/* Top-Left Scattered Floating Pill */}
              <div className={`${styles.orbitPill} ${styles.pillTopLeft}`}>
                <FaVideo className={styles.orbitPillIcon} />
                <span className={styles.orbitPillText}>
                  Live Recitation Feedback
                </span>
              </div>

              {/* Top-Right Scattered Floating Pill */}
              <div className={`${styles.orbitPill} ${styles.pillTopRight}`}>
                <FaStar
                  className={styles.orbitPillIcon}
                  style={{ color: "#ffc107" }}
                />
                <span className={styles.orbitPillText}>4.9 ★ Rated App</span>
              </div>
            </div>

            {/* Real Phone Mockup Frame Overlay Container */}
            <div className={styles.phoneMockupContainer}>
              <video
                className={styles.videoInsideMockup}
                src={promoVideo}
                autoPlay
                loop
                muted
                playsInline
              />
              <img
                src={realPhoneFrame}
                alt="Basirah Phone Mockup Frame"
                className={styles.phoneMockupOverlay}
              />
            </div>

            {/* Bottom-Right Scattered Floating Pill */}
            <div className={`${styles.orbitPill} ${styles.pillBottomRight}`}>
              <FaCheckCircle className={styles.orbitPillIcon} />
              <span className={styles.orbitPillText}>
                Offline Progress Tracking
              </span>
            </div>
          </div>

          <div className={styles.poweredBySkylink}>
            <span>Powered by</span>
            <img
              src={skylink}
              alt="Skylink logo"
              className={styles.skylinkLogo}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Promotion;
