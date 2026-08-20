import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import logo from "../../../assets/images/Basirah Full Color Transparent.png";
import { FiUser, FiMail, FiMessageCircle, FiEdit2, FiSend } from "react-icons/fi";
import { sendContactMessage } from "../../../api/contact";
import { fetchContactInfo } from "../../../api/contactInfo";
import { toast } from "react-toastify";

export default function Contact() {
  const [contactInfo, setContactInfo] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    fetchContactInfo()
      .then((res) => setContactInfo(res.data))
      .catch(() => setContactInfo(null));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactMessage(form);
      toast.success("Thank you for reaching out! We will contact you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "Sorry, something went wrong. Please try again."
      );
    }
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.headerBox}
        >
          <div className={styles.badge}>GET IN TOUCH</div>
          <h2 className={styles.title}>Connect With Basirah Institute</h2>
          <p className={styles.subtitle}>
            Have questions about our programs, mobile app, or partnerships? Send us a message and our team will get back to you promptly.
          </p>
        </motion.div>

        {/* Content Box */}
        <div className={styles.contactWrapper}>
          {/* Left Panel: Location & Info */}
          <div className={styles.leftPanel}>
            <div className={styles.leftPanelOrb} />

            <div className={styles.mapCard}>
              <iframe
                title="Basirah Location Map"
                src={
                  contactInfo && contactInfo.map_embed_url
                    ? contactInfo.map_embed_url
                    : "  https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4260.214315121767!2d38.69437350489397!3d9.006219238370639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b870028eae6d5%3A0x62fd50413c65b3f0!2sApple%20plaza!5e0!3m2!1sen!2set!4v1752663205409!5m2!1sen!2set"
                }
                className={styles.mapIframe}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            <div className={styles.infoCard}>
              <img
                src={logo}
                alt="Basirah Logo"
                className={styles.infoLogo}
              />
              <h3>We Are Here to Support Your Journey</h3>
              <p>Reach out to us for student guidance, technical support, or institutional inquiries.</p>
            </div>
          </div>

          {/* Right Panel: Interactive Form */}
          <form
            className={styles.contactForm}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <h3 className={styles.formTitle}>Send Us a Message</h3>

            <div className={styles.inputGroup}>
              <FiUser className={styles.inputIcon} />
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <FiMail className={styles.inputIcon} />
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <FiEdit2 className={styles.inputIcon} />
              <input
                className={styles.input}
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.textareaGroup}>
              <FiMessageCircle className={styles.textareaIcon} />
              <textarea
                className={styles.textarea}
                name="message"
                placeholder="Your Message..."
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button className={styles.submitBtn} type="submit">
              <span>Send Message</span>
              <FiSend className={styles.sendIcon} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
