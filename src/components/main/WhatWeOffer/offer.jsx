import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./offer.module.css";
import * as Icons from "react-icons/fa";
import { fetchOffers } from "../../../api/offers";

const defaultOffers = [
  {
    num: "١",
    title: "Simplified Learning",
    description: "Complex tajweed rules & classical Arabic simplified into intuitive, visual lessons.",
    icon: "FaBookReader",
  },
  {
    num: "٢",
    title: "Self-Paced Track",
    description: "Study at your own rhythm anytime with 24/7 mobile access and structured tracking.",
    icon: "FaClock",
  },
  {
    num: "٣",
    title: "Scholar Mentorship",
    description: "Direct recitation correction and guidance by certified Islamic scholars.",
    icon: "FaUsers",
  },
  {
    num: "٤",
    title: "Dedicated Sanctuary",
    description: "Academic mentors always ready to accompany every step of your study journey.",
    icon: "FaHeadset",
  },
];

export default function WhatWeOffer() {
  const [offers, setOffers] = useState(defaultOffers);

  useEffect(() => {
    const getOffers = async () => {
      try {
        const response = await fetchOffers();
        if (response.data && response.data.length > 0) {
          // Only use API data if it has the new fields (num, icon)
          if (response.data[0].num) {
            setOffers(response.data);
          } else {
            console.warn("API returned legacy data for Offers. Using fallback.");
          }
        }
      } catch (error) {
        console.error("Error fetching offers", error);
      }
    };
    getOffers();
  }, []);

  const getIconComponent = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.FaStar;
    return <IconComponent />;
  };

  return (
    <section className={styles.section} id="offer">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={styles.headerBox}
        >
          <div className={styles.badge}>WHAT WE OFFER</div>
          <h2 className={styles.title}>The Sanctuary Pillars</h2>
          <p className={styles.subtitle}>
            A peaceful digital platform uniting authentic scholarship with modern intuitive tools.
          </p>
        </motion.div>

        {/* Slender Islamic Arch Sanctuary Panels */}
        <div className={styles.archGrid}>
          {offers.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              className={styles.archPanel}
            >
              <span className={styles.arabicNum}>{item.num || defaultOffers[index]?.num || defaultOffers[0].num}</span>
              <div className={styles.iconHalo}>{getIconComponent(item.icon || defaultOffers[index]?.icon || defaultOffers[0].icon)}</div>
              <h3 className={styles.archTitle}>{item.title || defaultOffers[index]?.title || defaultOffers[0].title}</h3>
              <p className={styles.archDesc}>{item.description || item.desc || defaultOffers[index]?.description || defaultOffers[0].description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
