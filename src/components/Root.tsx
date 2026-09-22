import { Outlet } from 'react-router';
import Nav from './Nav';
import Footer from './Footer';
import Bee from './Bee';

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Bee />
    </div>
  );
}
