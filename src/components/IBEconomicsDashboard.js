import React from 'react';
import IBEconomicsMindMap from './MindMapTree';
import styles from '../styles/IBEconomicsDashboard.module.css'; // Use the new CSS module
import { motion } from 'framer-motion';

export default function IBEconomicsDashboard() {
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
          <h2 className={styles.dashboardTitle}>Economics Dashboard</h2>
          <p className={styles.dashboardText}>
          </p>
          <motion.button
            className={styles.dashboardButton}
            whileHover={{ scale: 1.1 }}
          >
            Start Learning
          </motion.button>
        </motion.div>
        <motion.div
          className={styles.dashboardMindMap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <IBEconomicsMindMap />
        </motion.div>
      </div>
    </section>
  );
}
