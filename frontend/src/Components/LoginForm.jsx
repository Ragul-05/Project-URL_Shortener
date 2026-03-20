import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    else if (!emailRegex.test(form.email.trim())) nextErrors.email = 'Enter a valid email';
    if (!form.password) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');
    try {
      const data = await loginUser(form);
      const token = data?.token;
      if (!token) throw new Error('Token missing from response');

      login(token);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      if (status === 401) setServerError('Invalid credentials');
      else if (status === 404) setServerError('User not found');
      else setServerError(message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <InputField
        name="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        required
        error={errors.email}
        autoComplete="email"
      />

      <div className="field-group">
        <label className="field-label" htmlFor="password">Password</label>
        <div className="password-field">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            className={`field-input${errors.password ? ' has-error' : ''}`}
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            className="icon-button password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password ? <p className="field-error">{errors.password}</p> : null}
      </div>

      {serverError ? <ErrorMessage message={serverError} /> : null}

      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Login'}
      </button>

      {loading ? <Loader message="Securing your session..." /> : null}
    </form>
  );
}

export default LoginForm;
