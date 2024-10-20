import React from 'react';
import styles from '../styles/IBMathFormulaGrid.module.css'; // Formula Grid CSS

const formulas = [
  { title: 'Quadratic Formula', formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
  { title: 'Pythagoras Theorem', formula: 'a^2 + b^2 = c^2' },
  { title: 'Sine Rule', formula: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}' },
  { title: 'Cosine Rule', formula: 'c^2 = a^2 + b^2 - 2ab \\cos C' },
  { title: 'Derivative of a Function', formula: '\\frac{d}{dx} f(x)' },
  { title: 'Integration by Parts', formula: '\\int u \\ dv = uv - \\int v \\ du' },
  // Add more key formulas or problem types here
];

const IBMathFormulaGrid = () => {
  return (
    <div className={styles.formulaGrid}>
      {formulas.map((item, index) => (
        <div key={index} className={styles.formulaCard}>
          <h3>{item.title}</h3>
          <p>{item.formula}</p>
        </div>
      ))}
    </div>
  );
};

export default IBMathFormulaGrid;
