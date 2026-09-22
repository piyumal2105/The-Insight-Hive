import { createBrowserRouter } from 'react-router';
import Root from './components/Root';
import Home from './pages/Home';
import About from './pages/About';
import WhatWeDo from './pages/WhatWeDo';
import OurWork from './pages/OurWork';
import Contact from './pages/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'what-we-do', Component: WhatWeDo },
      { path: 'our-work', Component: OurWork },
      { path: 'contact', Component: Contact },
    ],
  },
]);
