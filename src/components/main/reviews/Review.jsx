import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Review.module.css";
import ustazImg from "../../../assets/images/ustaz/ustaz_k.png";
import { fetchReviews } from "../../../api/reviews";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import skylink from "../../../assets/images/logo.png";
import basirahLogo from "../../../assets/images/Basirah Full Color Transparent.png";

const fallbackReviews = [
  {
    name: "Fatima Ali",
    role: "Student",
    text: "Basirah has transformed my Qur'anic journey. The lessons and certified scholars are truly outstanding!",
    img: ustazImg,
  },
  {
    name: "Dr. Ahmed Yusuf",
    role: "Islamic Scholar",
    text: "A wonderful platform for beginners and advanced students. Highly recommended for authentic knowledge.",
    img: ustazImg,
  },
  {
    name: "Mohammed Salim",
    role: "Parent",
    text: "My children love the lessons. Intuitive, educational, and a true blessing for our family.",
    img: ustazImg,
  },
  {
    name: "Aisha Noor",
    role: "Qur'an Teacher",
    text: "Tracking student progress is seamless. My students are more motivated and consistent than ever!",
    img: ustazImg,
  },
  {
    name: "Yusuf Ibrahim",
    role: "University Student",
    text: "The tajweed lessons are exceptional. I feel genuine improvement in my recitation every session.",
    img: ustazImg,
  },
  {
    name: "Maryam Hassan",
    role: "Community Member",
    text: "Basirah connects hearts through the Qur'an. The scholar network feels like a true family.",
    img: ustazImg,
  },
];

function Review() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const apiReviews = res.data.map((rev) => ({
            name: rev.name || "Anonymous",
            role: rev.role || "Community Member",
            text: rev.text || rev.content || "A wonderful experience with Basirah Institute.",
            img: rev.image
              ? `https://besirad.basirahtv.com/storage/${rev.image}`
              : ustazImg,
          }));
          if (apiReviews.length < 6) {
            setReviews([...apiReviews, ...fallbackReviews.slice(0, 6 - apiReviews.length)]);
          } else {
            setReviews(apiReviews);
          }
        } else {
          setReviews(fallbackReviews);
        }
        setLoading(false);
      })
      .catch(() => {
        setReviews(fallbackReviews);
        setLoading(false);
      });
  }, []);

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;
  
  // Double the arrays to create seamless infinite scrolling
  const row1Reviews = [...displayReviews, ...displayReviews];
  const row2Reviews = [...displayReviews.slice().reverse(), ...displayReviews.slice().reverse()];

  return (
    <section className={styles.section} id="reviews">
      {/* Background Ambient Orbs */}
      <div className={styles.orbLeft} />
      <div className={styles.orbRight} />

      <div className={styles.layout}>

        {/* ── Large phone background (centered) ── */}
        <div className={styles.phoneArea}>
          <motion.div
            className={styles.phoneWrap}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.phoneScreen} />
            <div className={styles.phoneContent}>
              <img src={basirahLogo} alt="Basirah" className={styles.phoneLogo} />
              <div className={styles.badge}>
                <FaQuoteLeft size={9} /> TESTIMONIALS
              </div>
              <h2 className={styles.heading}>
                What Our<br />Community Says
              </h2>
              <p className={styles.subtext}>
                Hear from students, parents, and scholars growing with Basirah.
              </p>
            </div>
            
            {/* Skylink Logo tucked into the exposed bottom of the phone */}
            <div className={styles.poweredBySkylink}>
              <span>Powered by</span>
              <img src={skylink} alt="Skylink logo" className={styles.skylinkLogo} />
            </div>
          </motion.div>
        </div>

        {/* ── Infinite Marquee Cards Overlay (Preserved Exact Animation) ── */}
        {!loading && (
          <div className={styles.cardsOverlay}>
            
            {/* Top Row Marquee (Scrolling Left) */}
            <div className={styles.marqueeRow}>
              <div className={styles.marqueeTrackLeft}>
                {row1Reviews.map((rev, idx) => (
                  <div key={idx} className={styles.card}>
                    <div className={styles.cardTop}>
                      <div className={styles.meta}>
                        <span className={styles.name}>{rev.name}</span>
                        <span className={styles.role}>{rev.role}</span>
                      </div>
                      <img
                        src={rev.img}
                        alt={rev.name}
                        className={styles.avatar}
                        onError={(e) => { e.target.onerror = null; e.target.src = ustazImg; }}
                      />
                    </div>

                    {/* Star Rating Row */}
                    <div className={styles.starsRow}>
                      {[...Array(5)].map((_, s) => (
                        <FaStar key={s} className={styles.starIcon} />
                      ))}
                    </div>

                    <p className={styles.text}>"{rev.text}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row Marquee (Scrolling Right) */}
            <div className={styles.marqueeRow}>
              <div className={styles.marqueeTrackRight}>
                {row2Reviews.map((rev, idx) => (
                  <div key={idx} className={styles.card}>
                    <div className={styles.cardTop}>
                      <div className={styles.meta}>
                        <span className={styles.name}>{rev.name}</span>
                        <span className={styles.role}>{rev.role}</span>
                      </div>
                      <img
                        src={rev.img}
                        alt={rev.name}
                        className={styles.avatar}
                        onError={(e) => { e.target.onerror = null; e.target.src = ustazImg; }}
                      />
                    </div>

                    {/* Star Rating Row */}
                    <div className={styles.starsRow}>
                      {[...Array(5)].map((_, s) => (
                        <FaStar key={s} className={styles.starIcon} />
                      ))}
                    </div>

                    <p className={styles.text}>"{rev.text}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default Review;
