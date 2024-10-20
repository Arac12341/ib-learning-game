import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import UserContext from '../context/UserContext';
import UserStatistics from '../components/UserStatistics';
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [activeSection, setActiveSection] = useState('');
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  const subjects = ['IB Comp Sci HL', 'IB Math HL', 'IB Economics HL'];
  const reports = ['Weekly Reports', 'Monthly Reports'];
  const achievements = ['Badges', 'Certificates'];

  const toggleOverview = () => setIsOverviewOpen(!isOverviewOpen);
  const toggleReports = () => setIsReportsOpen(!isReportsOpen);
  const toggleAchievements = () => setIsAchievementsOpen(!isAchievementsOpen);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <Header />
      <div className={styles.dashboardContainer}>
        <div className={styles.userInfoRow}>
          <div className={styles.userInfoLeft}>
            <div className={styles.userIcon}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className={styles.userName}>
              <h2>{user?.name?.split(' ')[0] || 'Guest'}</h2>
              <p>Premium Member</p>
            </div>
          </div>
        </div>

        <div className={styles.mainBox}>
          <div className={styles.sidebar}>
            <div className={styles.subjectOverview} onClick={toggleOverview}>
              <span>Subject Overview</span>
              <img
                src="/images/downArrow.png"
                alt="Toggle Arrow"
                className={`${styles.arrowIcon} ${isOverviewOpen ? styles.arrowOpen : ''}`}
              />
            </div>
            <ul className={`${styles.subjectList} ${isOverviewOpen ? styles.showSubjects : ''}`}>
              {subjects.map((subject) => (
                <li
                  key={subject}
                  className={`${styles.sidebarLink} ${activeSection === subject ? styles.active : ''}`}
                  onClick={() => handleSectionClick(subject)}
                >
                  {subject}
                </li>
              ))}
            </ul>

            <div className={styles.subjectOverview} onClick={toggleReports}>
              <span>Progress Reports</span>
              <img
                src="/images/downArrow.png"
                alt="Toggle Arrow"
                className={`${styles.arrowIcon} ${isReportsOpen ? styles.arrowOpen : ''}`}
              />
            </div>
            <ul className={`${styles.subjectList} ${isReportsOpen ? styles.showSubjects : ''}`}>
              {reports.map((report) => (
                <li
                  key={report}
                  className={`${styles.sidebarLink} ${activeSection === report ? styles.active : ''}`}
                  onClick={() => handleSectionClick(report)}
                >
                  {report}
                </li>
              ))}
            </ul>

            <div className={styles.subjectOverview} onClick={toggleAchievements}>
              <span>Achievements</span>
              <img
                src="/images/downArrow.png"
                alt="Toggle Arrow"
                className={`${styles.arrowIcon} ${isAchievementsOpen ? styles.arrowOpen : ''}`}
              />
            </div>
            <ul className={`${styles.subjectList} ${isAchievementsOpen ? styles.showSubjects : ''}`}>
              {achievements.map((achievement) => (
                <li
                  key={achievement}
                  className={`${styles.sidebarLink} ${activeSection === achievement ? styles.active : ''}`}
                  onClick={() => handleSectionClick(achievement)}
                >
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.subjectDetails}>
            {subjects.includes(activeSection) && <UserStatistics subject={activeSection} />}
            
            {reports.includes(activeSection) && (
              <div>
                <h2>{activeSection}</h2>
                <p>This is the content for {activeSection}. You can add graphs or specific data here.</p>
              </div>
            )}
            
            {achievements.includes(activeSection) && (
              <div>
                <h2>{activeSection}</h2>
                <p>Achievements details will be shown here. For example, badges or certificates earned.</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.subjectCardsContainer}>
          {subjects.map((subject) => (
            <div className={styles.subjectCard} key={subject}>
              <div className={styles.cardHeader}>
                <h4>{subject}</h4>
              </div>
              <Link href={`/dashboard/${encodeURIComponent(subject)}`} passHref>
                <div className={styles.subjectButton}>
                  <div className={styles.buttonText}>{`${subject} Dashboard`}</div>
                  <img
                    src="/images/arrowIconMain.png" 
                    alt="Icon"
                    className={styles.buttonImage}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
