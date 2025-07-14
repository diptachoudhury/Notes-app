import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
        {children}
      </main>
    </div>
  );
};

export default Layout;