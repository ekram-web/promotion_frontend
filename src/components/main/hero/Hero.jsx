import React, { useState, useEffect, useRef } from "react";
import styles from "./Hero.module.css";

// Three Photoroom phone cutouts (Fallbacks)
import defaultPhoneOne from "../../../assets/images/besira_one-Photoroom.png";
import defaultPhoneTwo from "../../../assets/images/besira_two-Photoroom.png";
import defaultPhoneThree from "../../../assets/images/besira_three-Photoroom.png";

import { fetchHero } from "../../../api/hero";

// 4 rotating Quranic verses (Default fallback)
const defaultVerses = [
  {
    ar: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    en: '"And say: My Lord, increase me in knowledge."',
    ref: "— Surah Taha, 20:114",
  },
  {
    ar: "إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ",
    en: '"Indeed, those who fear Allah among His servants are the knowledgeable."',
    ref: "— Surah Fatir, 35:28",
  },
  {
    ar: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
    en: '"Read in the name of your Lord who created."',
    ref: "— Surah Al-Alaq, 96:1",
  },
  {
    ar: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ",
    en: '"And We send down of the Quran that which is healing and mercy."',
    ref: "— Surah Al-Isra, 17:82",
  },
];

function Hero() {
  const [verses, setVerses] = useState(defaultVerses);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true); // true = visible
  const timerRef = useRef(null);

  useEffect(() => {
    const getHeroData = async () => {
      try {
        const response = await fetchHero();
        if (response.data && response.data.length > 0) {
          // Only use API data if it has the new fields (ar, en, ref)
          if (response.data[0].ar) {
            setVerses(response.data);
          } else {
            console.warn("API returned legacy data for Hero. Using fallback.");
          }
        }
      } catch (error) {
        console.error("Error fetching hero data", error);
      }
    };
    getHeroData();
  }, []);

  // Auto-rotate every 8 seconds
  const startTimer = () => {
    clearTimeout(timerRef.current);
    if (verses.length <= 1) return;
    
    timerRef.current = setTimeout(() => {
      // Fade out
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % verses.length);
        setFade(true);
      }, 500);
    }, 8000);
  };

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timerRef.current);
  }, [current, verses]);

  const goTo = (index) => {
    if (index === current) return;
    clearTimeout(timerRef.current);
    setFade(false);
    setTimeout(() => {
      setCurrent(index);
      setFade(true);
    }, 400);
  };

  if (verses.length === 0) return null;

  const v = verses[current];

  const getPhoneImage = (url, fallback) => {
    // We use the production URL for deployment
    return url ? `https://besirad.basirahtv.com/storage/${url}` : fallback;
  };

  return (
    <section className={styles.hero} id="hero">
      {/* ── Background Layers ── */}
      <div className={styles.calligraphyWatermark} aria-hidden="true">
        بصيرة
      </div>
      <div className={styles.geoGrid}></div>
      <div className={`${styles.orb} ${styles.orbGreen}`}></div>
      <div className={`${styles.orb} ${styles.orbTeal}`}></div>
      <div className={`${styles.orb} ${styles.orbGold}`}></div>

      {/* ── Rotating Quran Verse (TOP) ── */}
      <div className={styles.heroContent}>
        <p
          className={styles.verseArabic}
          style={{
            opacity: fade ? 1 : 0,
            transform: fade ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {v.ar || defaultVerses[current]?.ar}
        </p>
        <p
          className={styles.verseEnglish}
          style={{
            opacity: fade ? 1 : 0,
            transform: fade ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}
        >
          {v.en || defaultVerses[current]?.en}
        </p>
        <p
          className={styles.verseRef}
          style={{
            opacity: fade ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          {v.ref || defaultVerses[current]?.ref}
        </p>

        {/* Navigation dots */}
        <div className={styles.verseNav}>
          {verses.map((_, i) => (
            <button
              key={i}
              className={`${styles.vDot} ${i === current ? styles.vDotActive : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Verse ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── 3D Phone Cluster (BELOW VERSE) ── */}
      <div className={styles.phonePond}>
        <div className={`${styles.pondPhone} ${styles.left}`}>
          <div className={styles.phoneNotch}></div>
          <img
            src={getPhoneImage(v.phone_image_1, defaultPhoneOne)}
            alt="Basirah TV Splash Screen"
            draggable={false}
          />
        </div>
        <div className={`${styles.pondPhone} ${styles.center}`}>
          <div className={styles.phoneNotch}></div>
          <img 
            src={getPhoneImage(v.phone_image_2, defaultPhoneTwo)} 
            alt="Basirah TV Library" 
            draggable={false} 
          />
        </div>
        <div className={`${styles.pondPhone} ${styles.right}`}>
          <div className={styles.phoneNotch}></div>
          <img
            src={getPhoneImage(v.phone_image_3, defaultPhoneThree)}
            alt="Basirah TV My Learning"
            draggable={false}
          />
        </div>
      </div>

      {/* ── CTA Buttons ── */}
      <div className={styles.heroCta}>
        <a href="#youtube" className={`${styles.ctaPill} ${styles.primary}`}>
          Explore Courses
        </a>
        <a href="#promote" className={`${styles.ctaPill} ${styles.ghost}`}>
          Download App
        </a>
      </div>

      {/* ── Scroll Hint ── */}
      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <div className={styles.scrollLine}></div>
      </div>

      {/* ── Bottom Curve Wave Separator ── */}
      <div className={styles.bottomCurveWave}>
        <svg
          viewBox="0 0 1440 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.waveSvg}
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C480,45 960,45 1440,0 V50 H0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
