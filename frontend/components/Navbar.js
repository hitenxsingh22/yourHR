import Link from "next/link";
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="navbar-brand yourhr-text">
          YourHR
        </Link>
        <div className="navbar-links">
          <Link href="/signup" className="upload-resume-button">
            Upload Resume
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
