import { Link } from 'react-router-dom';
import RegisterForm from '../Components/RegisterForm';

function Register() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="brand-label">User Onboarding</p>
          <h1>Register</h1>
          <p>Create your account with secure credentials.</p>
        </div>

        <RegisterForm />

        <p className="auth-footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
