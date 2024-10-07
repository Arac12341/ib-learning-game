import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from '../styles/Hero.module.css';

export default function Hero() {
  const reviews = [
    { text: "Amazing platform, I improved my grades tremendously!", author: "Student 1" },
    { text: "Easy to use and really interactive, highly recommend!", author: "Student 2" },
    { text: "It made my IB journey so much smoother!", author: "Student 3" },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % reviews.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [reviews.length]);

  return (
    <section className={styles.hero}>
      <div className={`${styles.heroContainer}`}>
        {/* Left side: Title and button */}
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className={styles.heroTitle}>IBMastery</h2>
          <p className={styles.heroText}>
            Master IB Subjects with <br /> interactive games, lessons, and more.
          </p>
          <motion.button
            className={styles.heroButton}
            whileHover={{ scale: 1.1 }}
          >
            Start Learning
          </motion.button>
        </motion.div>

        {/* Right side: Slideshow */}
        <motion.div
          className={styles.heroSlideshow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className={`${styles.slide} ${index === activeSlide ? styles.active : ''}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: index === activeSlide ? 1 : 0, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className={styles.reviewText}>"{review.text}"</p>
              <span className={styles.reviewAuthor}>- {review.author}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
