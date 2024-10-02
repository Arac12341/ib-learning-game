// src/components/Footer.js
import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 IB Learning Hub. All Rights Reserved.</p>
      <nav className={styles.footerLinks}>
        <a href="#" className={styles.footerLink}>Privacy Policy</a>
        <a href="#" className={styles.footerLink}>Terms of Service</a>
      </nav>
    </footer>
  )
}
