import { Link } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="brand-label">Secure Access</p>
          <h1>Login</h1>
          <p>Use your account to access the dashboard.</p>
        </div>

        <LoginForm />

        <p className="auth-footer-text">
          New user? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
