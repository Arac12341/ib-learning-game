import Link from 'next/link';
import styles from '../styles/FeaturedSections.module.css';

export default function FeaturedSections() {
  return (
    <section className={styles.featuredSection}>
      <div className={styles.sectionGrid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>IB Computer Science</h3>
          <p className={styles.cardDescription}>
            Learn programming, data structures, and algorithms.
          </p>
          <Link href="/computer-science-outline" className={styles.cardButton}>
            Explore Course
          </Link>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>IB Economics</h3>
          <p className={styles.cardDescription}>
            Master microeconomics, macroeconomics, and global economics concepts.
          </p>
          <button className={styles.cardButton}>Explore Course</button>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>IB Math</h3>
          <p className={styles.cardDescription}>
            Study calculus, algebra, probability, and statistics.
          </p>
          <button className={styles.cardButton}>Explore Course</button>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>IB Physics</h3>
          <p className={styles.cardDescription}>
            Explore physics concepts like mechanics and quantum physics.
          </p>
          <button className={styles.cardButton}>Explore Course</button>
        </div>
      </div>
    </section>
  );
}
