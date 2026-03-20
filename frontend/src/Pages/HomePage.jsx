import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../Components/Navbar';

function HomePage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="app-shell">
      <div className="page-shell">
        <Navbar />

        <section className="hero-panel">
          <div className="hero-copy">
            <span className="eyebrow">Enterprise URL Shortener</span>
            <h1>Shorten long links and manage them from one focused workspace.</h1>
            <p>
              Create compact URLs, copy them instantly, and review link performance in
              a clean enterprise dashboard.
            </p>
            <div style={{ marginTop: '24px' }}>
              <Link to="/register" className="primary-button">Get Started Free</Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="card-header">
              <div>
                <h2>Secure Link Management</h2>
                <p>Join thousands of users managing their links securely.</p>
              </div>
              <div className="status-chip">Enterprise Ready</div>
            </div>

            <div className="empty-state">
              <h3>Login to Create Links</h3>
              <p>Access your personal dashboard to create, manage and track your shortened URLs.</p>
              <div style={{ marginTop: '16px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <Link to="/login" className="secondary-button">Login</Link>
                <Link to="/register" className="primary-button">Create Account</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
