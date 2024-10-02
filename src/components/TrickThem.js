import React, { useState } from 'react';
import styles from '../styles/TrickThem.module.css'; 

const featuresData = [
  {
    id: 1,
    title: 'Practice through interactive games',
    image: '/images/QuestionBank.png' 
  },
  {
    id: 2,
    title: 'Detailed analysis',
    description: 'Get detailed analysis for every mission',
  },
  {
    id: 3,
    title: 'Personalised feedback',
    description: 'Personalised feedback given by highly trained AI',
  },
  {
    id: 4,
    title: 'Practice exams',
    description: 'Practice exams provided in the form of boss fights',
  },
  {
    id: 5,
    title: 'Notes on every key concept',
    description: 'Comprehensive notes to cover every subtopic thoroughly.',
  },
];

export default function WhyChooseUs() {
  const [selectedFeature, setSelectedFeature] = useState(featuresData[0]);

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
  };

  return (
    <section className={styles.whySection}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <h2 className={styles.sectionTitle}>Why Us?</h2>
          <ul className={styles.featuresList}>
            {featuresData.map((feature) => (
              <li key={feature.id}>
                <button
                  className={`${styles.featureButton} ${
                    selectedFeature.id === feature.id ? styles.activeButton : ''
                  }`}
                  onClick={() => handleFeatureClick(feature)}
                >
                  {feature.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.rightColumn}>
          <img
            src={selectedFeature.image}
            alt={selectedFeature.title}
            className={styles.mockupImage}
          />
          <p className={styles.description}>{selectedFeature.description}</p>
        </div>
      </div>
    </section>
  );
}
