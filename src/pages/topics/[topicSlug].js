import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import styles from '../../styles/TopicPage.module.css';
import Link from 'next/link';
import { useMathJax } from '../../utils/useMathJax.js';

const TopicPage = () => {
  const router = useRouter();
  const { topicSlug } = router.query;
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isExercisesOpen, setIsExercisesOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('HL');
  const [notes, setNotes] = useState('');
  const [loadingNotes, setLoadingNotes] = useState(false);

  const formattedTopic = topicSlug?.replace(/-/g, ' ') || '';

  const toggleResources = () => setIsResourcesOpen(!isResourcesOpen);
  const toggleExercises = () => setIsExercisesOpen(!isExercisesOpen);

  // Fetch AI-generated notes from the API
  const fetchNotes = async (level) => {
    setLoadingNotes(true);
    try {
      const response = await fetch(`/api/generate-notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: formattedTopic, level }),
      });

      const data = await response.json();
      setNotes(data.notes);
    } catch (error) {
      console.error('Error generating notes:', error);
      setNotes('Failed to load notes.');
    } finally {
      setLoadingNotes(false);
    }
  };

  useEffect(() => {
    if (topicSlug) {
      fetchNotes(selectedLevel);
    }
  }, [topicSlug, selectedLevel]);

  useMathJax();

  if (!topicSlug) return <p>Loading...</p>;

  return (
    <>
      <Header />

      {/* Topic Title */}
      <div className={styles.topicTitleContainer}>
        <h1 className={styles.topicTitle}>{formattedTopic}</h1>
      </div>

      <div className={styles.topicPageContainer}>
        {/* Left Section - Notes */}
        <div className={styles.leftSection}>
          {/* Level Selection (HL/SL) */}
          <div className={styles.levelSelector}>
            <button
              className={selectedLevel === 'HL' ? styles.activeLevel : ''}
              onClick={() => setSelectedLevel('HL')}
            >
              Higher Level (HL)
            </button>
            <button
              className={selectedLevel === 'SL' ? styles.activeLevel : ''}
              onClick={() => setSelectedLevel('SL')}
            >
              Standard Level (SL)
            </button>
          </div>

          {/* Display Notes */}
          <div className={styles.notesContainer}>
            {loadingNotes ? (
              <p>Generating notes for {formattedTopic}...</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: notes }} />
            )}
          </div>
        </div>

        {/* Right Section - Helpful Material */}
        <div className={styles.rightSection}>
          <div className={styles.collapsibleSection}>
            <div className={styles.sectionHeader} onClick={toggleResources}>
              <span>Related Resources</span>
            </div>
            {isResourcesOpen && (
              <div className={styles.resourceButtonsContainer}>
                <Link href={`/resources/textbook/${topicSlug}`} passHref>
                  <div className={styles.resourceButton}>
                    <span>Textbook: Chapter on {formattedTopic}</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className={styles.collapsibleSection}>
            <div className={styles.sectionHeader} onClick={toggleExercises}>
              <span>Exercises & Practice</span>
            </div>
            {isExercisesOpen && (
              <div className={styles.resourceButtonsContainer}>
                <Link href={`/exercises/quiz/${topicSlug}`} passHref>
                  <div className={styles.resourceButton}>
                    <span>Quiz on {formattedTopic}</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicPage;
