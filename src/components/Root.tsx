import { Outlet } from 'react-router';
import Nav from './Nav';
import Footer from './Footer';
import Bee from './Bee';
import ScrollToTop from './ScrollToTop';
import BackToTop from './BackToTop';

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Bee />
      <BackToTop />
    </div>
  );
}