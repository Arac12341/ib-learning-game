// src/components/FeaturedSections.js
import styles from '../styles/FeaturedSections.module.css';

export default function FeaturedSections() {
  return (
    <section className={styles.featuredSection}>
      <div className={styles.sectionGrid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>IB Comp Sci</h3>
          <p className={styles.cardDescription}>Learn the fundamentals of programming, data structures, and algorithms.</p>
          <button className={styles.cardButton}>Explore Course</button>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>IB Economics</h3>
          <p className={styles.cardDescription}>Master microeconomics, macroeconomics, and global economics concepts.</p>
          <button className={styles.cardButton}>Explore Course</button>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>IB Math</h3>
          <p className={styles.cardDescription}>Understand calculus, algebra, probability, and statistics for your IB Math course.</p>
          <button className={styles.cardButton}>Explore Course</button>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>IB Physics</h3>
          <p className={styles.cardDescription}>Explore physics concepts like mechanics, thermodynamics, and quantum physics.</p>
          <button className={styles.cardButton}>Explore Course</button>
        </div>
      </div>
    </section>
  );
}
