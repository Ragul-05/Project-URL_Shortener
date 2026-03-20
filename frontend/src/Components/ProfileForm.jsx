import { useState, useEffect } from 'react';
import InputField from './InputField';
import Loader from './Loader';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
import { fetchProfile, updateProfile } from '../services/userService';

function ProfileForm() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchProfile();
        setForm({ name: data?.name || '', email: data?.email || '' });
      } catch (err) {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          // Parent component or router will handle redirection
          setError('Unauthorized access. Please login again.');
        } else {
          setError('Failed to load profile.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage('');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;

    setSaving(true);
    setMessage('');
    setError('');

    try {
      const data = await updateProfile({ name: form.name });
      setForm((prev) => ({ ...prev, name: data?.name || prev.name }));
      setMessage('Profile updated successfully');
    } catch {
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader message="Loading profile..." />;
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <InputField
        name="name"
        label="Name"
        value={form.name}
        onChange={handleChange}
        required
        placeholder="Enter your name"
      />

      <InputField
        name="email"
        type="email"
        label="Email"
        value={form.email}
        disabled
        readOnly
      />

      {error ? <ErrorMessage message={error} /> : null}
      <SuccessMessage message={message} />

      <button className="primary-button" type="submit" disabled={saving}>
        {saving ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
}

export default ProfileForm;
