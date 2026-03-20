import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import { registerUser } from '../services/authService';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    else if (!emailRegex.test(form.email.trim())) nextErrors.email = 'Enter a valid email';

    if (!form.password) nextErrors.password = 'Password is required';
    else if (form.password.length < 6) nextErrors.password = 'Minimum 6 characters';

    if (!form.confirmPassword) nextErrors.confirmPassword = 'Confirm your password';
    else if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setServerError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password });
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login', { replace: true }), 900);
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      if (status === 409) {
        setServerError('Email already exists');
      } else if (status === 400) {
        setServerError('Invalid input');
      } else {
        setServerError(message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <InputField
        name="name"
        label="Name"
        placeholder="Jane Doe"
        value={form.name}
        onChange={handleChange}
        required
        error={errors.name}
        autoComplete="name"
      />

      <InputField
        name="email"
        type="email"
        label="Email"
        placeholder="jane@example.com"
        value={form.email}
        onChange={handleChange}
        required
        error={errors.email}
        autoComplete="email"
      />

      <InputField
        name="password"
        type="password"
        label="Password"
        placeholder="At least 6 characters"
        value={form.password}
        onChange={handleChange}
        required
        minLength={6}
        error={errors.password}
        autoComplete="new-password"
      />

      <InputField
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Re-enter your password"
        value={form.confirmPassword}
        onChange={handleChange}
        required
        error={errors.confirmPassword}
        autoComplete="new-password"
      />

      {serverError ? <ErrorMessage message={serverError} /> : null}
      {success ? <SuccessMessage message={success} /> : null}

      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Register'}
      </button>

      {loading ? <Loader message="Submitting your details..." /> : null}
    </form>
  );
}

export default RegisterForm;
