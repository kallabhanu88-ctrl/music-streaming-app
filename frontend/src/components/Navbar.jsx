import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // optional, to highlight active link

  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-3">
      {/* Empty left space */}
      <div className="w-1/3"></div>

      {/* Center: App name */}
      <div className="w-1/3 text-center">
        <h1 className="text-2xl font-bold">🎵 Music Streaming App</h1>
      </div>

      {/* Right: Links */}
      <div className="w-1/3 flex justify-end gap-6">
        <Link
          to="/"
          className={`hover:text-blue-400 ${
            location.pathname === "/" ? "text-blue-400 font-semibold" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/playlist"
          className={`hover:text-blue-400 ${
            location.pathname === "/playlist" ? "text-blue-400 font-semibold" : ""
          }`}
        >
          Playlist
        </Link>
        <Link
          to="/admin"
          className={`hover:text-blue-400 ${
            location.pathname === "/admin" ? "text-blue-400 font-semibold" : ""
          }`}
        >
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
