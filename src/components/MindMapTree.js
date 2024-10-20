import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import styles from '../styles/MindMapStyles.module.css';
import { useRouter } from 'next/router';

// Fixed positions for the nodes (scattered layout)
const fixedPositions = {
  '1': { x: 100, y: 100 },
  '2': { x: 300, y: 300 },
  '3': { x: 500, y: 100 },
  '4': { x: 700, y: 300 },
  '5': { x: 150, y: 200 },
  '6': { x: 200, y: 400 },
  '7': { x: 600, y: 200 },
  '8': { x: 800, y: 400 },
  '9': { x: 100, y: 300 },
  '10': { x: 150, y: 500 },
  '11': { x: 650, y: 250 },
  '12': { x: 850, y: 500 },
  '13': { x: 300, y: 600 },
  '14': { x: 450, y: 600 },
  '15': { x: 600, y: 600 },
};

// Fixed color assignments for nodes
const fixedColors = {
  '1': '#ff7f0e', // Orange
  '2': '#2ca02c', // Green
  '3': '#1f77b4', // Blue
  '4': '#d62728', // Red
  '5': '#9467bd', // Purple
  '6': '#8c564b', // Brown
  '7': '#e377c2', // Pink
  '8': '#7f7f7f', // Gray
  '9': '#bcbd22', // Yellow-Green
  '10': '#17becf', // Cyan
  '11': '#98df8a', // Light Green
  '12': '#ff9896', // Light Red
  '13': '#ffbb78', // Light Orange
  '14': '#c5b0d5', // Light Purple
  '15': '#f7b6d2', // Light Pink
};

const initialNodes = [
  { id: '1', label: 'Foundations of Economics', size: 100, color: '#99ccff', position: { x: 50, y: 50 } },
  { id: '2', label: 'Microeconomics', size: 100, color: '#ff9999', position: { x: 400, y: 50 } },
  { id: '3', label: 'Macroeconomics', size: 100, color: '#ffcc66', position: { x: 750, y: 50 } },
  { id: '4', label: 'Global Economy', size: 100, color: '#66cc99', position: { x: 600, y: 200 } },

  { id: '1.1', label: 'What is Economics?', size: 80, color: '#b3e6ff', position: { x: 100, y: 150 } },
  { id: '1.1.1', label: 'Economics as a Social Science', size: 60, color: '#cceeff', position: { x: 50, y: 250 } },
  { id: '1.1.2', label: 'The Problem of Choice', size: 60, color: '#cceeff', position: { x: 150, y: 250 } },
  { id: '1.1.3', label: 'PPC Model', size: 60, color: '#cceeff', position: { x: 75, y: 300 } },
  { id: '1.1.4', label: 'Modelling the Economy', size: 60, color: '#cceeff', position: { x: 125, y: 300 } },

  { id: '1.2', label: 'How Economists Approach the World', size: 80, color: '#b3e6ff', position: { x: 100, y: 350 } },
  { id: '1.2.1', label: 'Economic Methodology', size: 60, color: '#cceeff', position: { x: 50, y: 400 } },
  { id: '1.2.2', label: 'Economic Thought', size: 60, color: '#cceeff', position: { x: 150, y: 400 } },

  { id: '2.1', label: 'Demand', size: 80, color: '#ffb3b3', position: { x: 350, y: 150 } },
  { id: '2.1.1', label: 'Demand, Price & Quantity', size: 60, color: '#ffd9d9', position: { x: 300, y: 250 } },
  { id: '2.1.2', label: 'Non-Price Determinants of Demand', size: 60, color: '#ffd9d9', position: { x: 400, y: 250 } },

  { id: '2.2', label: 'Supply', size: 80, color: '#ffb3b3', position: { x: 450, y: 150 } },
  { id: '2.2.1', label: 'Supply, Price & Quantity', size: 60, color: '#ffd9d9', position: { x: 400, y: 250 } },
  { id: '2.2.2', label: 'Non-Price Determinants of Supply', size: 60, color: '#ffd9d9', position: { x: 500, y: 250 } },

  { id: '2.3', label: 'Market Equilibrium', size: 80, color: '#ffb3b3', position: { x: 400, y: 300 } },
  { id: '2.3.1', label: 'Market Equilibrium & Disequilibrium', size: 60, color: '#ffd9d9', position: { x: 350, y: 350 } },
  { id: '2.3.2', label: 'Functions of the Price Mechanism', size: 60, color: '#ffd9d9', position: { x: 450, y: 350 } },
  { id: '2.3.3', label: 'Consumer & Producer Surplus', size: 60, color: '#ffd9d9', position: { x: 400, y: 400 } }, 
  
  { id: '2.4', label: 'Critique of Maximizing Behavior', size: 80, color: '#ffb3b3', position: { x: 350, y: 350 } },
  { id: '2.4.1', label: 'Rational Consumer Choice', size: 60, color: '#ffd9d9', position: { x: 300, y: 400 } },
  { id: '2.4.2', label: 'Behavioral Economics in Action', size: 60, color: '#ffd9d9', position: { x: 350, y: 450 } },
  { id: '2.4.3', label: 'Business Objectives', size: 60, color: '#ffd9d9', position: { x: 400, y: 400 } },
  
  { id: '2.5', label: 'Elasticities of Demand', size: 80, color: '#ffb3b3', position: { x: 450, y: 500 } },
  { id: '2.5.1', label: 'Price Elasticity of Demand (PED)', size: 60, color: '#ffd9d9', position: { x: 400, y: 550 } },
  { id: '2.5.2', label: 'Significance of PED', size: 60, color: '#ffd9d9', position: { x: 450, y: 600 } },
  { id: '2.5.3', label: 'Income Elasticity of Demand (YED)', size: 60, color: '#ffd9d9', position: { x: 500, y: 550 } },
  
  { id: '2.6', label: 'Price Elasticity of Supply (PES)', size: 80, color: '#ffb3b3', position: { x: 350, y: 650 } },
  { id: '2.6.1', label: 'Understanding PES', size: 60, color: '#ffd9d9', position: { x: 350, y: 700 } },
  
  { id: '2.7', label: 'Role of Government in Microeconomics', size: 80, color: '#ffb3b3', position: { x: 450, y: 750 } },
  { id: '2.7.1', label: 'Reasons for Government Intervention', size: 60, color: '#ffd9d9', position: { x: 400, y: 800 } },
  { id: '2.7.2', label: 'Indirect Taxes & Subsidies', size: 60, color: '#ffd9d9', position: { x: 450, y: 850 } },
  { id: '2.7.3', label: 'Price Controls', size: 60, color: '#ffd9d9', position: { x: 500, y: 800 } },
  { id: '2.7.4', label: 'Direct Provision & Regulation', size: 60, color: '#ffd9d9', position: { x: 450, y: 900 } },
  
  { id: '2.8', label: 'Market Failure: Externalities', size: 80, color: '#ffb3b3', position: { x: 350, y: 950 } },
  { id: '2.8.1', label: 'Market Failure', size: 60, color: '#ffd9d9', position: { x: 300, y: 1000 } },
  { id: '2.8.2', label: 'Negative Externalities', size: 60, color: '#ffd9d9', position: { x: 350, y: 1050 } },
  { id: '2.8.3', label: 'Positive Externalities', size: 60, color: '#ffd9d9', position: { x: 400, y: 1000 } },
  { id: '2.8.4', label: 'Common Pool Resources', size: 60, color: '#ffd9d9', position: { x: 350, y: 1100 } },
  { id: '2.8.5', label: 'Government Intervention', size: 60, color: '#ffd9d9', position: { x: 300, y: 1150 } },
  { id: '2.8.6', label: 'Other Interventions', size: 60, color: '#ffd9d9', position: { x: 400, y: 1150 } }, 
  // 2.9 Market Failure: Public Goods
  { id: '2.9', label: 'Market Failure: Public Goods', size: 80, color: '#ffb3b3', position: { x: 450, y: 1200 } },
  { id: '2.9.1', label: 'Public Goods', size: 60, color: '#ffd9d9', position: { x: 450, y: 1250 } },
  
  // 2.10 Market Failure: Asymmetric Information
  { id: '2.10', label: 'Market Failure: Asymmetric Information', size: 80, color: '#ffb3b3', position: { x: 350, y: 1300 } },
  { id: '2.10.1', label: 'Asymmetric Information', size: 60, color: '#ffd9d9', position: { x: 350, y: 1350 } },
  
  // 2.11 Market Failure: Market Power
  { id: '2.11', label: 'Market Failure: Market Power', size: 80, color: '#ffb3b3', position: { x: 450, y: 1400 } },
  { id: '2.11.1', label: 'Introduction to Market Structures', size: 60, color: '#ffd9d9', position: { x: 400, y: 1450 } },
  { id: '2.11.2', label: 'Profit Maximisation', size: 60, color: '#ffd9d9', position: { x: 450, y: 1500 } },
  { id: '2.11.3', label: 'Perfect Competition', size: 60, color: '#ffd9d9', position: { x: 500, y: 1450 } },
  { id: '2.11.4', label: 'Monopolies', size: 60, color: '#ffd9d9', position: { x: 425, y: 1550 } },
  { id: '2.11.5', label: 'Oligopolies', size: 60, color: '#ffd9d9', position: { x: 475, y: 1550 } },
  { id: '2.11.6', label: 'Monopolistic Competition', size: 60, color: '#ffd9d9', position: { x: 450, y: 1600 } },
  { id: '2.11.7', label: 'Government Intervention', size: 60, color: '#ffd9d9', position: { x: 450, y: 1650 } },
  
  // 2.12 The Market's Inability to Achieve Equity
  { id: '2.12', label: 'Market Inability to Achieve Equity', size: 80, color: '#ffb3b3', position: { x: 350, y: 1700 } },
  { id: '2.12.1', label: 'Markets Cause Inequality', size: 60, color: '#ffd9d9', position: { x: 350, y: 1750 } },
  
  

  // Unit 3 Subtopics
  { id: '3.1', label: 'Measuring Economic Activity', size: 80, color: '#ffe0b3', position: { x: 700, y: 150 } },
  { id: '3.1.1', label: 'National Income & Circular Flow', size: 60, color: '#fff0cc', position: { x: 650, y: 250 } },
  { id: '3.1.2', label: 'Income Terminology & Calculations', size: 60, color: '#fff0cc', position: { x: 750, y: 250 } },
  { id: '3.1.3', label: 'Business Cycle', size: 60, color: '#fff0cc', position: { x: 700, y: 300 } },
  { id: '3.1.4', label: 'GDP/GNI as a Measure of Well-being', size: 60, color: '#fff0cc', position: { x: 675, y: 350 } },
  { id: '3.1.5', label: 'Alternative Measures of Well-being', size: 60, color: '#fff0cc', position: { x: 725, y: 350 } },

  { id: '3.2', label: 'Variations in Economic Activity', size: 80, color: '#ffe0b3', position: { x: 750, y: 400 } },
  { id: '3.2.1', label: 'Aggregate Demand (AD)', size: 60, color: '#fff0cc', position: { x: 700, y: 450 } },
  { id: '3.2.2', label: 'Short-run Aggregate Supply (SRAS)', size: 60, color: '#fff0cc', position: { x: 800, y: 450 } },
  { id: '3.2.3', label: 'Alternative Views of AS', size: 60, color: '#fff0cc', position: { x: 750, y: 500 } },
  { id: '3.2.4', label: 'Shifts of Long-run AS (LRAS)', size: 60, color: '#fff0cc', position: { x: 725, y: 550 } },
  { id: '3.2.5', label: 'Macroeconomic Equilibrium', size: 60, color: '#fff0cc', position: { x: 775, y: 550 } }, 
  
  { id: '3.3', label: 'Macroeconomic Objectives', size: 80, color: '#ffe0b3', position: { x: 750, y: 600 } },
  { id: '3.3.1', label: 'Introduction to Objectives', size: 60, color: '#fff0cc', position: { x: 700, y: 650 } },
  { id: '3.3.2', label: 'Economic Growth', size: 60, color: '#fff0cc', position: { x: 750, y: 700 } },
  { id: '3.3.3', label: 'Low Unemployment', size: 60, color: '#fff0cc', position: { x: 800, y: 650 } },
  { id: '3.3.4', label: 'Stable Inflation', size: 60, color: '#fff0cc', position: { x: 725, y: 750 } },
  { id: '3.3.5', label: 'Sustainable Debt', size: 60, color: '#fff0cc', position: { x: 775, y: 750 } },
  { id: '3.3.6', label: 'Conflicts Between Objectives', size: 60, color: '#fff0cc', position: { x: 750, y: 800 } },
  
  { id: '3.4', label: 'Inequality & Poverty', size: 80, color: '#ffe0b3', position: { x: 700, y: 850 } },
  { id: '3.4.1', label: 'Measuring Inequality', size: 60, color: '#fff0cc', position: { x: 650, y: 900 } },
  { id: '3.4.2', label: 'Causes of Inequality', size: 60, color: '#fff0cc', position: { x: 700, y: 950 } },
  { id: '3.4.3', label: 'Taxation Policies', size: 60, color: '#fff0cc', position: { x: 750, y: 900 } },
  { id: '3.4.4', label: 'Other Reduction Policies', size: 60, color: '#fff0cc', position: { x: 700, y: 1000 } },
  
  { id: '3.5', label: 'Monetary Policy', size: 80, color: '#ffe0b3', position: { x: 800, y: 850 } },
  { id: '3.5.1', label: 'Overview', size: 60, color: '#fff0cc', position: { x: 750, y: 900 } },
  { id: '3.5.2', label: 'Tools of Policy', size: 60, color: '#fff0cc', position: { x: 850, y: 900 } },
  
  { id: '3.6', label: 'Fiscal Policy', size: 80, color: '#ffe0b3', position: { x: 750, y: 1050 } },
  { id: '3.6.1', label: 'Overview', size: 60, color: '#fff0cc', position: { x: 700, y: 1100 } },
  { id: '3.6.2', label: 'Keynesian Multiplier', size: 60, color: '#fff0cc', position: { x: 750, y: 1150 } },
  { id: '3.6.3', label: 'Policy Evaluation', size: 60, color: '#fff0cc', position: { x: 800, y: 1100 } },
  
  { id: '3.7', label: 'Supply-Side Policies', size: 80, color: '#ffe0b3', position: { x: 750, y: 1200 } },
  { id: '3.7.1', label: 'Overview of Supply-Side Policies', size: 60, color: '#fff0cc', position: { x: 700, y: 1250 } },
  { id: '3.7.2', label: 'Effectiveness of Supply-Side Policies', size: 60, color: '#fff0cc', position: { x: 800, y: 1250 } },

  // Unit 4 Subtopics
  { id: '4.1', label: 'Benefits of International Trade', size: 80, color: '#99e6cc', position: { x: 550, y: 250 } },
  { id: '4.1.1', label: 'Advantages of Free Trade', size: 60, color: '#ccefe6', position: { x: 500, y: 350 } },
  { id: '4.1.2', label: 'Absolute & Comparative Advantage', size: 60, color: '#ccefe6', position: { x: 600, y: 350 } },

  { id: '4.2', label: 'Types of Trade Protection', size: 80, color: '#99e6cc', position: { x: 650, y: 250 } },
  { id: '4.2.1', label: 'Tariffs', size: 60, color: '#ccefe6', position: { x: 600, y: 350 } },
  { id: '4.2.2', label: 'Quotas', size: 60, color: '#ccefe6', position: { x: 650, y: 400 } },
  { id: '4.2.3', label: 'Export Subsidies', size: 60, color: '#ccefe6', position: { x: 700, y: 350 } },
  { id: '4.2.4', label: 'Administrative Barriers', size: 60, color: '#ccefe6', position: { x: 650, y: 450 } },

  { id: '4.3', label: 'Arguments for & Against Trade Protection', size: 80, color: '#99e6cc', position: { x: 600, y: 500 } },
  { id: '4.3.1', label: 'Arguments for & Against Protection', size: 60, color: '#ccefe6', position: { x: 600, y: 550 } }, 
  
  { id: '4.4', label: 'Economic Integration', size: 80, color: '#99e6cc', position: { x: 600, y: 600 } },
  { id: '4.4.1', label: 'Understanding Integration', size: 60, color: '#ccefe6', position: { x: 550, y: 650 } },
  { id: '4.4.2', label: 'Types of Trading Blocs', size: 60, color: '#ccefe6', position: { x: 600, y: 700 } },
  { id: '4.4.3', label: 'World Trade Organization', size: 60, color: '#ccefe6', position: { x: 650, y: 650 } },
  
  { id: '4.5', label: 'Exchange Rates', size: 80, color: '#99e6cc', position: { x: 550, y: 750 } },
  { id: '4.5.1', label: 'Exchange Rate Systems', size: 60, color: '#ccefe6', position: { x: 500, y: 800 } },
  { id: '4.5.2', label: 'Causes of Fluctuations', size: 60, color: '#ccefe6', position: { x: 550, y: 850 } },
  { id: '4.5.3', label: 'Fixed vs. Floating Rates', size: 60, color: '#ccefe6', position: { x: 600, y: 800 } },
  
  { id: '4.6', label: 'Balance of Payments', size: 80, color: '#99e6cc', position: { x: 650, y: 750 } },
  { id: '4.6.1', label: 'Components', size: 60, color: '#ccefe6', position: { x: 600, y: 800 } },
  { id: '4.6.2', label: 'Exchange Rates Link', size: 60, color: '#ccefe6', position: { x: 650, y: 850 } },
  { id: '4.6.3', label: 'Account Deficits', size: 60, color: '#ccefe6', position: { x: 700, y: 800 } },
  { id: '4.6.4', label: 'Marshall-Lerner & J-Curve', size: 60, color: '#ccefe6', position: { x: 625, y: 900 } },
  { id: '4.6.5', label: 'Account Surpluses', size: 60, color: '#ccefe6', position: { x: 675, y: 900 } },
  
  { id: '4.7', label: 'Sustainable Development', size: 80, color: '#99e6cc', position: { x: 600, y: 950 } },
  { id: '4.7.1', label: 'SDGs', size: 60, color: '#ccefe6', position: { x: 550, y: 1000 } },
  { id: '4.7.2', label: 'Sustainability & Poverty', size: 60, color: '#ccefe6', position: { x: 650, y: 1000 } },
  
  { id: '4.8', label: 'Measuring Development', size: 80, color: '#99e6cc', position: { x: 550, y: 1050 } },
  { id: '4.8.1', label: 'Single Indicators', size: 60, color: '#ccefe6', position: { x: 500, y: 1100 } },
  { id: '4.8.2', label: 'Composite Indicators', size: 60, color: '#ccefe6', position: { x: 550, y: 1150 } },
  { id: '4.8.3', label: 'Evaluating Approaches', size: 60, color: '#ccefe6', position: { x: 600, y: 1100 } },
  
  { id: '4.9', label: 'Barriers to Growth & Development', size: 80, color: '#99e6cc', position: { x: 650, y: 1050 } },
  { id: '4.9.1', label: 'Poverty Traps', size: 60, color: '#ccefe6', position: { x: 600, y: 1100 } },
  { id: '4.9.2', label: 'Economic Barriers', size: 60, color: '#ccefe6', position: { x: 700, y: 1100 } },
  
  { id: '4.10', label: 'Growth & Development Strategies', size: 80, color: '#99e6cc', position: { x: 600, y: 1200 } },
  { id: '4.10.1', label: 'Trade Strategies', size: 60, color: '#ccefe6', position: { x: 550, y: 1250 } },
  { id: '4.10.2', label: 'Market-Based Policies', size: 60, color: '#ccefe6', position: { x: 600, y: 1300 } },
  { id: '4.10.3', label: 'Merit Goods & FDI', size: 60, color: '#ccefe6', position: { x: 650, y: 1250 } },
  { id: '4.10.4', label: 'Foreign Aid', size: 60, color: '#ccefe6', position: { x: 575, y: 1350 } },
  { id: '4.10.5', label: 'Institutional Change', size: 60, color: '#ccefe6', position: { x: 625, y: 1350 } },
  { id: '4.10.6', label: 'Evaluating Policies', size: 60, color: '#ccefe6', position: { x: 600, y: 1400 } },
  { id: '4.10.7', label: 'Progress Towards SDGs', size: 60, color: '#ccefe6', position: { x: 600, y: 1450 } },

];

const initialEdges = [
  // Unit 1 Edges
  { id: 'e1-1.1', source: '1', target: '1.1' },
  { id: 'e1.1-1.1.1', source: '1.1', target: '1.1.1' },
  { id: 'e1.1-1.1.2', source: '1.1', target: '1.1.2' },
  { id: 'e1.1-1.1.3', source: '1.1', target: '1.1.3' },
  { id: 'e1.1-1.1.4', source: '1.1', target: '1.1.4' },

  { id: 'e1-1.2', source: '1', target: '1.2' },
  { id: 'e1.2-1.2.1', source: '1.2', target: '1.2.1' },
  { id: 'e1.2-1.2.2', source: '1.2', target: '1.2.2' },

  // Unit 2 Edges
  { id: 'e2-2.1', source: '2', target: '2.1' },
  { id: 'e2.1-2.1.1', source: '2.1', target: '2.1.1' },
  { id: 'e2.1-2.1.2', source: '2.1', target: '2.1.2' },

  { id: 'e2-2.2', source: '2', target: '2.2' },
  { id: 'e2.2-2.2.1', source: '2.2', target: '2.2.1' },
  { id: 'e2.2-2.2.2', source: '2.2', target: '2.2.2' },

  { id: 'e2-2.3', source: '2', target: '2.3' },
  { id: 'e2.3-2.3.1', source: '2.3', target: '2.3.1' },
  { id: 'e2.3-2.3.2', source: '2.3', target: '2.3.2' },
  { id: 'e2.3-2.3.3', source: '2.3', target: '2.3.3' },

  { id: 'e2-2.4', source: '2', target: '2.4' },
  { id: 'e2.4-2.4.1', source: '2.4', target: '2.4.1' },
  { id: 'e2.4-2.4.2', source: '2.4', target: '2.4.2' },
  { id: 'e2.4-2.4.3', source: '2.4', target: '2.4.3' },

  { id: 'e2-2.5', source: '2', target: '2.5' },
  { id: 'e2.5-2.5.1', source: '2.5', target: '2.5.1' },
  { id: 'e2.5-2.5.2', source: '2.5', target: '2.5.2' },
  { id: 'e2.5-2.5.3', source: '2.5', target: '2.5.3' },

  { id: 'e2-2.6', source: '2', target: '2.6' },
  { id: 'e2.6-2.6.1', source: '2.6', target: '2.6.1' },

  { id: 'e2-2.7', source: '2', target: '2.7' },
  { id: 'e2.7-2.7.1', source: '2.7', target: '2.7.1' },
  { id: 'e2.7-2.7.2', source: '2.7', target: '2.7.2' },
  { id: 'e2.7-2.7.3', source: '2.7', target: '2.7.3' },
  { id: 'e2.7-2.7.4', source: '2.7', target: '2.7.4' },

  { id: 'e2-2.8', source: '2', target: '2.8' },
  { id: 'e2.8-2.8.1', source: '2.8', target: '2.8.1' },
  { id: 'e2.8-2.8.2', source: '2.8', target: '2.8.2' },
  { id: 'e2.8-2.8.3', source: '2.8', target: '2.8.3' },
  { id: 'e2.8-2.8.4', source: '2.8', target: '2.8.4' },
  { id: 'e2.8-2.8.5', source: '2.8', target: '2.8.5' },
  { id: 'e2.8-2.8.6', source: '2.8', target: '2.8.6' }, 

  { id: 'e2-2.9', source: '2', target: '2.9' },
  { id: 'e2.9-2.9.1', source: '2.9', target: '2.9.1' },
  
  { id: 'e2-2.10', source: '2', target: '2.10' },
  { id: 'e2.10-2.10.1', source: '2.10', target: '2.10.1' },
  
  { id: 'e2-2.11', source: '2', target: '2.11' },
  { id: 'e2.11-2.11.1', source: '2.11', target: '2.11.1' },
  { id: 'e2.11-2.11.2', source: '2.11', target: '2.11.2' },
  { id: 'e2.11-2.11.3', source: '2.11', target: '2.11.3' },
  { id: 'e2.11-2.11.4', source: '2.11', target: '2.11.4' },
  { id: 'e2.11-2.11.5', source: '2.11', target: '2.11.5' },
  { id: 'e2.11-2.11.6', source: '2.11', target: '2.11.6' },
  { id: 'e2.11-2.11.7', source: '2.11', target: '2.11.7' },
  
  { id: 'e2-2.12', source: '2', target: '2.12' },
  { id: 'e2.12-2.12.1', source: '2.12', target: '2.12.1' },
  

  

  { id: 'e3-3.1', source: '3', target: '3.1' },
  { id: 'e3.1-3.1.1', source: '3.1', target: '3.1.1' },
  { id: 'e3.1-3.1.2', source: '3.1', target: '3.1.2' },
  { id: 'e3.1-3.1.3', source: '3.1', target: '3.1.3' },
  { id: 'e3.1-3.1.4', source: '3.1', target: '3.1.4' },
  { id: 'e3.1-3.1.5', source: '3.1', target: '3.1.5' },

  { id: 'e3-3.2', source: '3', target: '3.2' },
  { id: 'e3.2-3.2.1', source: '3.2', target: '3.2.1' },
  { id: 'e3.2-3.2.2', source: '3.2', target: '3.2.2' },
  { id: 'e3.2-3.2.3', source: '3.2', target: '3.2.3' },
  { id: 'e3.2-3.2.4', source: '3.2', target: '3.2.4' },
  { id: 'e3.2-3.2.5', source: '3.2', target: '3.2.5' },

  { id: 'e3-3.3', source: '3', target: '3.3' },
  { id: 'e3.3-3.3.1', source: '3.3', target: '3.3.1' },
  { id: 'e3.3-3.3.2', source: '3.3', target: '3.3.2' },
  { id: 'e3.3-3.3.3', source: '3.3', target: '3.3.3' },
  { id: 'e3.3-3.3.4', source: '3.3', target: '3.3.4' },
  { id: 'e3.3-3.3.5', source: '3.3', target: '3.3.5' },
  { id: 'e3.3-3.3.6', source: '3.3', target: '3.3.6' },

  { id: 'e3-3.4', source: '3', target: '3.4' },
  { id: 'e3.4-3.4.1', source: '3.4', target: '3.4.1' },
  { id: 'e3.4-3.4.2', source: '3.4', target: '3.4.2' },
  { id: 'e3.4-3.4.3', source: '3.4', target: '3.4.3' },
  { id: 'e3.4-3.4.4', source: '3.4', target: '3.4.4' },

  { id: 'e3-3.5', source: '3', target: '3.5' },
  { id: 'e3.5-3.5.1', source: '3.5', target: '3.5.1' },
  { id: 'e3.5-3.5.2', source: '3.5', target: '3.5.2' },

  { id: 'e3-3.6', source: '3', target: '3.6' },
  { id: 'e3.6-3.6.1', source: '3.6', target: '3.6.1' },
  { id: 'e3.6-3.6.2', source: '3.6', target: '3.6.2' },
  { id: 'e3.6-3.6.3', source: '3.6', target: '3.6.3' },

  { id: 'e3-3.7', source: '3', target: '3.7' },
  { id: 'e3.7-3.7.1', source: '3.7', target: '3.7.1' },
  { id: 'e3.7-3.7.2', source: '3.7', target: '3.7.2' },

  { id: 'e4-4.1', source: '4', target: '4.1' },
  { id: 'e4.1-4.1.1', source: '4.1', target: '4.1.1' },
  { id: 'e4.1-4.1.2', source: '4.1', target: '4.1.2' },

  { id: 'e4-4.2', source: '4', target: '4.2' },
  { id: 'e4.2-4.2.1', source: '4.2', target: '4.2.1' },
  { id: 'e4.2-4.2.2', source: '4.2', target: '4.2.2' },
  { id: 'e4.2-4.2.3', source: '4.2', target: '4.2.3' },
  { id: 'e4.2-4.2.4', source: '4.2', target: '4.2.4' },

  { id: 'e4-4.3', source: '4', target: '4.3' },
  { id: 'e4.3-4.3.1', source: '4.3', target: '4.3.1' },

  { id: 'e4-4.4', source: '4', target: '4.4' },
  { id: 'e4.4-4.4.1', source: '4.4', target: '4.4.1' },
  { id: 'e4.4-4.4.2', source: '4.4', target: '4.4.2' },
  { id: 'e4.4-4.4.3', source: '4.4', target: '4.4.3' },

  { id: 'e4-4.5', source: '4', target: '4.5' },
  { id: 'e4.5-4.5.1', source: '4.5', target: '4.5.1' },
  { id: 'e4.5-4.5.2', source: '4.5', target: '4.5.2' },
  { id: 'e4.5-4.5.3', source: '4.5', target: '4.5.3' },

  { id: 'e4-4.6', source: '4', target: '4.6' },
  { id: 'e4.6-4.6.1', source: '4.6', target: '4.6.1' },
  { id: 'e4.6-4.6.2', source: '4.6', target: '4.6.2' },
  { id: 'e4.6-4.6.3', source: '4.6', target: '4.6.3' },
  { id: 'e4.6-4.6.4', source: '4.6', target: '4.6.4' },
  { id: 'e4.6-4.6.5', source: '4.6', target: '4.6.5' },

  { id: 'e4-4.7', source: '4', target: '4.7' },
  { id: 'e4.7-4.7.1', source: '4.7', target: '4.7.1' },
  { id: 'e4.7-4.7.2', source: '4.7', target: '4.7.2' },

  { id: 'e4-4.8', source: '4', target: '4.8' },
  { id: 'e4.8-4.8.1', source: '4.8', target: '4.8.1' },
  { id: 'e4.8-4.8.2', source: '4.8', target: '4.8.2' },
  { id: 'e4.8-4.8.3', source: '4.8', target: '4.8.3' },

  { id: 'e4-4.9', source: '4', target: '4.9' },
  { id: 'e4.9-4.9.1', source: '4.9', target: '4.9.1' },
  { id: 'e4.9-4.9.2', source: '4.9', target: '4.9.2' },

  { id: 'e4-4.10', source: '4', target: '4.10' },
  { id: 'e4.10-4.10.1', source: '4.10', target: '4.10.1' },
  { id: 'e4.10-4.10.2', source: '4.10', target: '4.10.2' },
  { id: 'e4.10-4.10.3', source: '4.10', target: '4.10.3' },
  { id: 'e4.10-4.10.4', source: '4.10', target: '4.10.4' },
  { id: 'e4.10-4.10.5', source: '4.10', target: '4.10.5' },
  { id: 'e4.10-4.10.6', source: '4.10', target: '4.10.6' },
  { id: 'e4.10-4.10.7', source: '4.10', target: '4.10.7' },

  { id: 'e2.7.3-3.3.4', source: '2.7.3', target: '3.3.4' },

  { id: 'e2.8.5-3.6', source: '2.8.5', target: '3.6' },

  { id: 'e3.7-3.2.4', source: '3.7', target: '3.2.4' },

  { id: 'e4.2-2.7.4', source: '4.2', target: '2.7.4' },

  { id: 'e2.8.1-4.7', source: '2.8.1', target: '4.7' },

  { id: 'e3.4-4.9', source: '3.4', target: '4.9' },

  { id: 'e3.5-4.5', source: '3.5', target: '4.5' },

  { id: 'e3.6-3.3.5', source: '3.6', target: '3.3.5' },
];



  
  const IBEconomicsMindMap = () => {
    const cyRef = useRef(null);
    const containerRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();  // Next.js router
  
    useEffect(() => {
      if (!containerRef.current) return;
  
      const cy = cytoscape({
        container: containerRef.current,
        elements: [
          ...initialNodes.map((node) => ({
            data: { id: node.id, label: node.label },
            position: node.position,
            style: {
              width: node.size,
              height: node.size,
              backgroundColor: node.color,
              shape: 'ellipse',
            },
          })),
          ...initialEdges.map((edge) => ({
            data: { id: edge.id, source: edge.source, target: edge.target },
          })),
        ],
        style: [
          {
            selector: 'node',
            style: {
              'background-color': 'data(backgroundColor)',
              'width': 'data(size)',
              'height': 'data(size)',
              'shape': 'ellipse',
              'font-family': 'Roboto Mono',
              'label': '', // Hide labels by default
            },
          },
          {
            selector: 'edge',
            style: {
              'width': 2,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
            },
          },
        ],
        layout: {
          name: 'preset',
          animate: false,
        },
        minZoom: 0.2,
        maxZoom: 1.5,
        
      });
  
      let currentTooltip = null;
  
      cy.on('tap', 'node', (event) => {
        if (currentTooltip) {
          currentTooltip.remove();
        }
  
        const clickedNode = event.target;
  
        currentTooltip = document.createElement('div');
        currentTooltip.className = styles.tooltip; 
        currentTooltip.innerText = clickedNode.data('label');
        document.body.appendChild(currentTooltip);
  
        currentTooltip.style.position = 'absolute';
        currentTooltip.style.padding = '5px 10px';
        currentTooltip.style.left = `${event.originalEvent.clientX + 10}px`;
        currentTooltip.style.top = `${event.originalEvent.clientY + 10}px`;
  
        const connectedNodes = cy.collection();
        const connectedEdges = cy.collection();
  
        cy.edges().forEach((edge) => {
          if (edge.source().id() === clickedNode.id() || edge.target().id() === clickedNode.id()) {
            connectedNodes.merge(edge.source());
            connectedNodes.merge(edge.target());
            connectedEdges.merge(edge);
          }
        });
  
        cy.nodes().style({ opacity: 0.1 });
        cy.edges().style({ opacity: 0.1 });
  
        clickedNode.style({ opacity: 1 });
        connectedNodes.style({ opacity: 1 });
        connectedEdges.style({ opacity: 1 });
      });
  
      cy.on('tap', (event) => {
        if (event.target === cy) {
          if (currentTooltip) {
            currentTooltip.remove();
            currentTooltip = null;
          }
  
          cy.nodes().style({ opacity: 1 });
          cy.edges().style({ opacity: 1 });
        }
      });

      cy.on('dbltap', 'node', (event) => {
        const clickedNode = event.target;
        const label = clickedNode.data('label');
      
        const topicSlug = label.toLowerCase().replace(/\s+/g, '-');  
      
        router.push(`/topics/${topicSlug}`);
      });
  
      cyRef.current = cy;
  
      return () => {
        if (currentTooltip) {
          currentTooltip.remove();
          currentTooltip = null;
        }
        if (cyRef.current) {
          cyRef.current.destroy();
        }
      };
    }, []);
  
    useEffect(() => {
      if (cyRef.current) {
        const cy = cyRef.current;
  
        cy.nodes().style({
          'border-width': 0,
          'opacity': 1, 
        });
  
        if (searchQuery.trim() !== '') {
          const matchingNodes = cy.nodes().filter((node) => {
            const label = node.data('label');
            return label && label.toLowerCase().includes(searchQuery.toLowerCase());
          });
  
          // Highlight matching nodes
          cy.nodes().style({ opacity: 0.1 });
          cy.edges().style({ opacity: 0.1 });
          matchingNodes.style({
            'opacity': 1,
            'border-width': 3,
            'border-color': '#ff0',
          });
  
          // Zoom to matching nodes if any exist
          if (matchingNodes.length > 0) {
            cy.fit(matchingNodes, 50);
          }
        } else {
          // Reset to default view if searchQuery is empty
          cy.nodes().style({ opacity: 1 });
          cy.edges().style({ opacity: 1 });
        }
      }
    }, [searchQuery]);
  
    return (
      <div className={styles.mindMapWrapper}>
        <div className={styles.mindMapSection}>
          <div className={styles.mindMapSearchBar}>
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.mindMapSearchInput}
            />
          </div>
  
          <div className={styles.mindMapContainer} ref={containerRef} />
        </div>
      </div>
    );
  };
  
  export default IBEconomicsMindMap;
  