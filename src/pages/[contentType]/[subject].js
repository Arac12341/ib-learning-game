// pages/content/[subject].js

import { useRouter } from 'next/router';
import Header from '../../components/Header';
import IBEconomicsDashboard from '../../components/IBEconomicsDashboard';
import IBMathDashboard from '@/components/IBMathDashboard';
import styles from '../../styles/ContentPage.module.css';

const ContentPage = () => {
  const router = useRouter();
  const { subject } = router.query;

  if (!subject) {
    return <p>Loading...</p>;
  }

  const renderSubjectDashboard = () => {
    switch (subject) {
      case 'IB Economics HL':
        return <IBEconomicsDashboard />;
      case 'IB Math HL AA':
        return <IBMathDashboard />;
      case 'IB Math HL AI':
        return <IBMathDashboard />;
      case 'IB Math SL AA':
        return <IBMathDashboard />;
      case 'IB Math SL AI':
        return <IBMathDashboard />;
      default:
        return <p>Subject dashboard for {subject} is not available.</p>;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      {renderSubjectDashboard()}
    </div>
  );
};

export default ContentPage;
