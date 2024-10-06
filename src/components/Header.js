import Link from 'next/link';
import React from 'react';
import styles from '../styles/Header.module.css'; 

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <span className={styles.logo}>MySite</span>
        
        {/* Navigation */}
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>Home</a>
          <a href="#" className={styles.navLink}>Courses</a>
          <a href="#" className={styles.navLink}>About</a>
        </nav>

        {/* Buttons */}
        <div className={styles.buttons}>
        <Link href="/SignUp" className={`${styles.button} ${styles.buttonOutline}`}>
          Sign Up
        </Link>          
        <Link href="/LogIn" className={`${styles.button} ${styles.buttonOutline}`}>
          Log In
        </Link> 
        </div>
      </div>
    </header>
  );
}
