import { motion } from 'framer-motion'
import styles from '../styles/Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container mx-auto">
        <motion.h2
          className={styles.heroTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          IBMastery
        </motion.h2>
        <p className={styles.heroText}>
          Master IB Subjects with interactive lessons, quizzes, and more.
        </p>
        <motion.button
          className={styles.heroButton}
          whileHover={{ scale: 1.1 }}
        >
          Start Learning
        </motion.button>
      </div>
    </section>
  )
}
