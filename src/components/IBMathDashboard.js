import React from 'react';
import IBMathFormulaGrid from './IBMathFormulaGrid'; // Formula Grid Component
import styles from '../styles/IBMathDashboard.module.css'; // Use the new CSS module
import { motion } from 'framer-motion';

export default function IBMathDashboard() {
  return (
    <section className={styles.dashboardHero}>
      <div className={styles.dashboardContainer}>
        {/* Left side: Title and text */}
        <motion.div
          className={styles.dashboardContent}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className={styles.dashboardTitle}>Mathematics Dashboard</h2>
          <p className={styles.dashboardText}>
            Explore key IB Math formulas, topics, and interactive examples to help you master the subject.
          </p>
          <motion.button
            className={styles.dashboardButton}
            whileHover={{ scale: 1.1 }}
          >
            Start Learning
          </motion.button>
        </motion.div>

        {/* Right side: Formula Grid */}
        <motion.div
          className={styles.dashboardFormulaGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <IBMathFormulaGrid />
        </motion.div>
      </div>
    </section>
  );
}
