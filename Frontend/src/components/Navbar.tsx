import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between">
        <Link to="/" className="font-medium text-blue-600">
          Notes App
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Notes
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-blue-600">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;