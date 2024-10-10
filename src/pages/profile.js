import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import UserContext from '../context/UserContext';
import styles from '../styles/profile.module.css';

export default function Profile() {
  const { user } = useContext(UserContext); 
  const [activeTab, setActiveTab] = useState('profile');
  const [username, setUsername] = useState(user?.username || '');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const router = useRouter();

  const getInitials = (name) => {
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return `${nameParts[0].charAt(0).toUpperCase()}${nameParts[1].charAt(0).toUpperCase()}`;
  };

  const handleSave = () => {
    alert('Profile updated successfully.');
    setIsEditingUsername(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <div className={styles.profileHeader}>
              <div className={styles.profileIcon}>
                {getInitials(user?.name || 'Guest')}
              </div>
              <div className={styles.profileDetails}>
                <h3>{user?.name || 'User'}</h3>
                <span>{user?.email.replace(/(.{2})(.*)(@)/, '$1***$3')}</span>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoBox}>
                <label className={styles.infoLabel}>Display Name</label>
                <div className={styles.displaySection}>
                  <span>{user?.name || 'N/A'}</span>
                  <button className={styles.editButton}>Edit</button>
                </div>
              </div>

              <div className={styles.infoBox}>
                <label className={styles.infoLabel}>Username</label>
                {!isEditingUsername ? (
                  <div className={styles.displaySection}>
                    <span>{username}</span>
                    <button onClick={() => setIsEditingUsername(true)} className={styles.editButton}>
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className={styles.usernameEdit}>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={styles.editableInput}
                    />
                    <button onClick={handleSave} className={styles.saveButton}>
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.infoBox}>
              <label className={styles.infoLabel}>Email</label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className={styles.editableInput}
              />
            </div>
          </>
        );
      case 'membership':
        return (
          <div>
            <h2>Membership Info</h2>
            <p>Your membership level: Premium</p>
            <p>Renewal Date: 2024-12-01</p>
          </div>
        );
      case 'billing':
        return (
          <div>
            <h2>Billing Info</h2>
            <p>Payment Method: Visa ending in 1234</p>
            <p>Last Payment Date: 2024-08-20</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.escapeButton} onClick={() => router.push('/')}>
        ESC
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.sidebar}>
          <h6>Settings</h6>
          <ul>
            <li
              onClick={() => setActiveTab('profile')}
              className={`${styles.sidebarLink} ${activeTab === 'profile' ? styles.active : ''}`}
            >
              Profile Settings
            </li>
            <li
              onClick={() => setActiveTab('membership')}
              className={`${styles.sidebarLink} ${activeTab === 'membership' ? styles.active : ''}`}
            >
              Membership
            </li>
            <li
              onClick={() => setActiveTab('billing')}
              className={`${styles.sidebarLink} ${activeTab === 'billing' ? styles.active : ''}`}
            >
              Billing
            </li>
          </ul>
        </div>

        <motion.div
          className={styles.profileContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
        {renderContent()}
        </motion.div>
      </div>
    </>
  );
}
