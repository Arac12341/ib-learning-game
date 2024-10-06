// src/pages/computer-science-outline.js
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/CourseOutline.module.css';
import { FaChevronDown } from 'react-icons/fa'; // Add the Chevron icon

const courseOutline = [
  {
    id: 1,
    unitTitle: "Unit 1: Introduction to Programming",
    subUnits: [
      {
        id: '1-1',
        title: "1.1 Basics of Programming",
        link: "/questions/introduction-to-programming-basics",
      },
      {
        id: '1-2',
        title: "1.2 Variables and Data Types",
        link: "/questions/variables-and-data-types",
      },
    ],
  },
  {
    id: 2,
    unitTitle: "Unit 2: Data Structures",
    subUnits: [
      {
        id: '2-1',
        title: "2.1 Arrays and Lists",
        link: "/questions/arrays-and-lists",
      },
      {
        id: '2-2',
        title: "2.2 Trees and Graphs",
        link: "/questions/trees-and-graphs",
      },
    ],
  },
];

export default function ComputerScienceOutline() {
  const [activeUnit, setActiveUnit] = useState(null); // Track only one active unit at a time

  // Toggle the unit, ensuring only one is active
  const toggleUnit = (unitId) => {
    if (activeUnit === unitId) {
      setActiveUnit(null); // Close if the same unit is clicked
    } else {
      setActiveUnit(unitId); // Open the clicked unit
    }
  };

  return (
    <div className={styles.courseOutlineContainer}>
      <h1 className={styles.courseTitle}>Computer Science Course Outline</h1>
      <div className={styles.unitGrid}>
        {courseOutline.map((unit) => (
          <div key={unit.id} className={styles.unitItem}>
            <div className={styles.unitHeader} onClick={() => toggleUnit(unit.id)}>
              <h3 className={styles.unitTitle}>{unit.unitTitle}</h3>
              <FaChevronDown
                className={`${styles.chevronIcon} ${activeUnit === unit.id ? styles.active : ''}`}
              />
            </div>

            {/* Show sub-units only if the corresponding unit is active */}
            <div
              className={`${styles.subUnitContainer} ${
                activeUnit === unit.id ? styles.active : ''
              }`}
            >
              <ul className={styles.subUnitList}>
                {unit.subUnits.map((subUnit) => (
                  <li key={subUnit.id} className={styles.subUnitItem}>
                    <Link href={subUnit.link} className={styles.subUnitLink}>
                      {subUnit.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
