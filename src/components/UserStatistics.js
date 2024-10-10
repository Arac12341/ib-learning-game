import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styles from '../styles/UserStatistics.module.css';

Chart.register(...registerables);

export default function UserStatistics({ subject }) {
  const [subjectData, setSubjectData] = useState(null);

  useEffect(() => {
    const dataBySubject = {
      'IB Comp Sci HL': {
        totalHours: [5, 7, 6, 8, 9],
        daysStudiedPerWeek: [5, 6, 4, 7, 6],
        taskCompletion: { easy: 85, medium: 70, hard: 60 },
        dailyGoalsAchieved: [4, 5, 4, 6, 5],
      },
      'IB Math HL AA': {
        totalHours: [2, 4, 6, 5, 7],
        daysStudiedPerWeek: [3, 4, 2, 5, 4],
        taskCompletion: { easy: 90, medium: 75, hard: 65 },
        dailyGoalsAchieved: [2, 3, 4, 4, 5],
      },
      'IB Economics HL': {
        totalHours: [3, 5, 4, 6, 5],
        daysStudiedPerWeek: [6, 5, 5, 7, 4],
        taskCompletion: { easy: 80, medium: 85, hard: 75 },
        dailyGoalsAchieved: [5, 4, 5, 5, 6],
      },
    };

    setSubjectData(dataBySubject[subject]);
  }, [subject]);

  if (!subjectData) {
    return <p>Loading data for {subject}...</p>;
  }

  const totalHoursData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Total Hours Studied',
        data: subjectData.totalHours,
        backgroundColor: '#998DA5',
        borderRadius: { topLeft: 10, topRight: 10 },
      },
    ],
  };

  const taskCompletionData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Task Completion by Level (%)',
        data: Object.values(subjectData.taskCompletion),
        backgroundColor: ['#43AA8B', '#EF946C', '#7FBBC7'],
        borderRadius: { topLeft: 10, topRight: 10 },
      },
    ],
  };

  const daysStudiedPerWeekData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Days Studied per Week',
        data: subjectData.daysStudiedPerWeek,
        backgroundColor: '#EF946C',
        borderRadius: { topLeft: 10, topRight: 10 },
      },
    ],
  };

  const dailyGoalsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Daily Goals Achieved',
        data: subjectData.dailyGoalsAchieved,
        backgroundColor: '#7FBBC7',
        borderRadius: { topLeft: 10, topRight: 10 },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
    },
  };

  return (
    <div className={styles.statisticsContainer}>
      <div className={styles.graphRow}>
        <div>
        <div className={styles.chartTitle}>Total Hours Spent Learning</div>
            <div className={styles.chartContainer}>
                <Bar data={totalHoursData} options={options} />
            </div>
        </div>

        <div>
        <div className={styles.chartTitle}>Task Completion</div>
            <div className={styles.chartContainer}>
                <Bar data={taskCompletionData} options={options} />
            </div>
        </div>
    </div>


    <div className={styles.graphRow}>
        <div>
        <div className={styles.chartTitle}>Days Studied Per Week</div>
            <div className={styles.chartContainer}>
                <Bar data={daysStudiedPerWeekData} options={options} />
            </div>
        </div>

        <div>
        <div className={styles.chartTitle}>Daily Goals Data</div>
            <div className={styles.chartContainer}>
                <Line data={dailyGoalsData} options={options} />
            </div>
        </div>
    </div>

      </div>
  );
}
