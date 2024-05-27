import { createRoot } from 'react-dom/client';

import HomePage from './HomePage';

const domNode = document.getElementById('app');
const root = createRoot(domNode);

root.render(
  <HomePage />
);
