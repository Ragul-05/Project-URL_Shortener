import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="brand-block">
        <div className="brand-mark">UL</div>
        <div>
          <p className="brand-label">URL Platform</p>
          <h1 className="brand-title">Link Management Dashboard</h1>
        </div>
      </div>

      <div className="navbar-actions">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="secondary-button small-button">Links</Link>
            <Link to="/profile" className="secondary-button small-button">Profile</Link>
            <button onClick={logout} className="ghost-danger-button small-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="secondary-button small-button">Login</Link>
            <Link to="/register" className="primary-button small-button">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
