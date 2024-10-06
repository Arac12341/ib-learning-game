import { useRouter } from 'next/router';

const mockQuestions = {
  "introduction-to-programming-basics": "Write a program to calculate the sum of two numbers.",
  "variables-and-data-types": "Explain the difference between int, float, and string in programming.",
  "arrays-and-lists": "Implement a list and perform basic operations like add, remove, and search.",
  "trees-and-graphs": "Implement a binary search tree and perform basic traversals.",
};

export default function QuestionPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{id.replace(/-/g, ' ').toUpperCase()} - Sample Question</h1>
      <p>{mockQuestions[id]}</p>
      <a href="/computer-science-outline" style={{ color: 'blue' }}>Back to Course Outline</a>
    </div>
  );
}
