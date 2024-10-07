import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { parseCookies, destroyCookie } from 'nookies';
import jwt_decode from 'jwt-decode';
import styles from '../styles/Header.module.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const cookies = parseCookies();
    console.log("Cookies found:", cookies);

    if (cookies.token) {
      setIsLoggedIn(true);

      try {
        const decodedToken = jwt_decode(cookies.token);
        console.log("Decoded Token:", decodedToken);

        const name = decodedToken.name || 'Guest User';
        console.log("Name found in token:", name);

        setUserName(name);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    destroyCookie(null, 'token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const getInitials = (name) => {
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return `${nameParts[0].charAt(0).toUpperCase()}${nameParts[1].charAt(0).toUpperCase()}`;
  };

  console.log("Final User Name:", userName);
  console.log("Initials:", getInitials(userName));

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <span className={styles.logo}>MySite</span>

        <nav className={styles.nav}>
          {/* Add your nav items here */}
        </nav>

        <div className={styles.buttons}>
          {isLoggedIn ? (
            <div className={styles.profileMenu}>
              {/* Display user's initials */}
              <div className={styles.profileIconImage}>
                {userName ? getInitials(userName) : 'G'} {/* Default to 'G' if userName is not available */}
              </div>

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
