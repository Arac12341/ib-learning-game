import React from 'react';
import IBEconomicsMindMap from './MindMapTree';
import styles from '../styles/IBEconomicsDashboard.module.css'; // Use the new CSS module
import { motion } from 'framer-motion';

export default function IBCompSciDashboard() {
  return (
    <section className={styles.dashboardHero}>
      <div className={styles.dashboardContainer}>
        <motion.div
          className={styles.dashboardContent}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className={styles.dashboardTitle}>IB Economics HL Dashboard</h2>
          <p className={styles.dashboardText}>
            Master IB Economics with interactive mind maps, games, and more.
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
