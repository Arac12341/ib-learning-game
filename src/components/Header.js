import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { parseCookies, destroyCookie } from 'nookies';
import styles from '../styles/Header.module.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    destroyCookie(null, 'token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <span className={styles.logo}>MySite</span>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/courses" className={styles.navLink}>Courses</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
        </nav>

        <div className={styles.buttons}>
          {isLoggedIn ? (
            <div className={styles.profileMenu}>
              {/* Profile Icon */}
              <img
                src="/images/profileicon.png" // Replace with your image path
                alt="Profile Icon"
                className={styles.profileIconImage}
              />
              {/* Dropdown */}
              <div className={styles.profileDropdown}>
                <ul>
                  <li>
                    <img src="/images/settings.png" alt="Settings" className={styles.dropdownIcon} />
                    <Link href="/profile">My Account</Link>
                  </li>
                  <li className={styles.signOut} onClick={handleLogout}>
                    <img src="/images/logout.png" alt="Log Out" className={styles.dropdownIcon} />
                    <span>Sign Out</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Link href="/SignUp" className={`${styles.button} ${styles.buttonOutline}`}>
                Sign Up
              </Link>
              <Link href="/LogIn" className={`${styles.button} ${styles.buttonOutline}`}>
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
