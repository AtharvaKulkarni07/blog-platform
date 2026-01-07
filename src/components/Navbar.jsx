import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
        <Link to="/" className="font-bold text-xl">BlogPlatform</Link>

        <div className="flex gap-6">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/write">Write</Link>
        </div>
      </div>
    </nav>
  );
}
