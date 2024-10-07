// src/components/Footer.js
import styles from '../styles/Footer.module.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Left: Company Information */}
        <div className={styles.companyInfo}>
          <h4>IB Learning Hub</h4>
        </div>

        {/* Middle: Navigation Links */}
        <nav className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>Privacy Policy</a>
          <a href="#" className={styles.footerLink}>Terms of Service</a>
          <a href="#" className={styles.footerLink}>Contact Us</a>
        </nav>

        {/* Right: Social Media Icons */}
        <div className={styles.socialMedia}>
          <a href="#" aria-label="Facebook" className={styles.socialIcon}>
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Twitter" className={styles.socialIcon}>
            <FaTwitter />
          </a>
          <a href="#" aria-label="Instagram" className={styles.socialIcon}>
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className={styles.newsletter}>
        <h4>Subscribe to Our Newsletter</h4>
        <form className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.newsletterInput}
          />
          <button className={styles.newsletterButton} type="submit">
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
}
