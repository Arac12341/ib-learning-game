import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { parseCookies, destroyCookie } from 'nookies';
import { jwtDecode } from 'jwt-decode';
import styles from '../styles/Header.module.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(''); 
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (!token) {
      console.log("No token found");
      return;
    }

    const decodedToken = jwtDecode(token);

    if (decodedToken && decodedToken.name) {
      setUserName(decodedToken.name);
      setIsLoggedIn(true);  
    } else {
      console.log("Decoded token does not contain a name.");
      setUserName('Guest');
    }

  }, []);

  const handleLogout = () => {
    destroyCookie(null, 'token'); 
    setIsLoggedIn(false);
    window.location.href = '/'; 
  };

  const getInitials = (name) => {
    console.log("Name before extracting initials:", name);

    if (!name) {
      console.warn("No name provided for initials extraction, returning default 'G'");
      return 'G'; // Default to 'G' if no name is provided
    }

    const nameParts = name.trim().split(' ');
    console.log("Name parts split:", nameParts); // Log the name split into parts

    const initials = nameParts.length > 1
      ? `${nameParts[0].charAt(0).toUpperCase()}${nameParts[1].charAt(0).toUpperCase()}`
      : nameParts[0].charAt(0).toUpperCase();

    console.log("Generated initials:", initials); // Log the generated initials
    return initials;
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown); 
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
      <Link href="/">
          <img className={styles.logo} src="/images/IBWLogo.png" alt="Logo" />
        </Link>        
        
        <nav className={styles.nav}>
          <div className={styles.navItem}>
            <span onClick={() => toggleDropdown('home')} className={styles.navLink}>
              Home
            </span>
            <div className={`${styles.dropdownMenu} ${activeDropdown === 'home' ? styles.showDropdown : ''}`}>
              <Link href="/home-option-1" className={styles.dropdownItem}>Home Option 1</Link>
              <Link href="/home-option-2" className={styles.dropdownItem}>Home Option 2</Link>
            </div>
          </div>

          <div className={styles.navItem}>
            <span onClick={() => toggleDropdown('courses')} className={styles.navLink}>
              Courses
            </span>
            <div className={`${styles.dropdownMenu} ${activeDropdown === 'courses' ? styles.showDropdown : ''}`}>
              <Link href="/course-1" className={styles.dropdownItem}>Course 1</Link>
              <Link href="/course-2" className={styles.dropdownItem}>Course 2</Link>
            </div>
          </div>

          <div className={styles.navItem}>
            <span onClick={() => toggleDropdown('about')} className={styles.navLink}>
              About
            </span>
            <div className={`${styles.dropdownMenu} ${activeDropdown === 'about' ? styles.showDropdown : ''}`}>
              <Link href="/about-1" className={styles.dropdownItem}>About 1</Link>
              <Link href="/about-2" className={styles.dropdownItem}>About 2</Link>
            </div>
          </div>
        </nav>

        <div className={styles.buttons}>
          {isLoggedIn ? (
            <div className={styles.profileMenu}>
              <div className={styles.profileIconImage}>
                {getInitials(userName)}
              </div>
              
              <div className={styles.profileDropdown}>
                <ul>
                <li>
                      <img src="/images/DashboardIcon.png" alt="Dashboard" className={styles.dropdownIcon} />
                      <Link href="/dashboard">Dashboard</Link>
                  </li>
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
