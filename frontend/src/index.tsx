import React from 'react';
import { createRoot } from 'react-dom/client';
import { DashboardAnalytics } from './DashboardAnalytics';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<DashboardAnalytics />);
}