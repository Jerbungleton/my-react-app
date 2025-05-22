import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-music-dark shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white hover:text-music-primary">
          Your Band/Artist Name
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-music-primary px-3 py-2 rounded-md text-sm font-medium">Home</Link>
          <Link to="/music" className="text-gray-300 hover:text-music-primary px-3 py-2 rounded-md text-sm font-medium">Music</Link>
          <Link to="/store" className="text-gray-300 hover:text-music-primary px-3 py-2 rounded-md text-sm font-medium">Store</Link>
          <Link to="/about" className="text-gray-300 hover:text-music-primary px-3 py-2 rounded-md text-sm font-medium">About</Link>
          <Link to="/contact" className="text-gray-300 hover:text-music-primary px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
        </div>
      </div>
    </nav>
  );
}