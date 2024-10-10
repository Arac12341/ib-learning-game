import React from 'react';
import Header from '../components/Header';
import styles from '../styles/computerScience.module.css';

export default function ComputerScience() {
  return (
    <>
      <Header />
      <div className={styles.csPage}>
        <section className={styles.heroSection}>
          <h1 className={styles.title}>IB Computer Science</h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </section>

        <div className={styles.topicSection}>
          <div className={styles.topicRow}>
            <div className={styles.topicBox} style={{ backgroundColor: '#998DA5' }}>
              <h3>Algorithms</h3>
              <p className={styles.description}>Learn about algorithms, their types, and applications.</p>
            </div>
            <div className={styles.topicBox} style={{ backgroundColor: '#7FBBC7' }}>
              <h3>Data Structures</h3>
              <p className={styles.description}>Understand various data structures used in computing.</p>
            </div>
            <div className={styles.topicBox} style={{ backgroundColor: '#EF946C' }}>
              <h3>Java</h3>
              <p className={styles.description}>Master the basics of Java programming and OOP concepts.</p>
            </div>
          </div>

          <div className={`${styles.topicRow} ${styles.secondRow}`}>
            <div className={styles.topicBox} style={{ backgroundColor: '#BBC8CA' }}>
              <h3>Databases</h3>
              <p className={styles.description}>Explore database management systems and SQL queries.</p>
            </div>
            <div className={styles.topicBox} style={{ backgroundColor: '#EB6F7A' }}>
              <h3>Linked Lists</h3>
              <p className={styles.description}>Learn how linked lists work and their practical uses.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
