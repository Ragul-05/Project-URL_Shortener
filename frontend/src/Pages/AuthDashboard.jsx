import { useState } from 'react';
import Navbar from '../Components/Navbar';
import UrlForm from '../Components/UrlForm';
import Dashboard from './Dashboard';
import InsightsDashboard from './InsightsDashboard';
import Loader from '../Components/Loader';
import ErrorMessage from '../Components/ErrorMessage';
import ResultCard from '../Components/ResultCard';
import { shortenUrl } from '../services/urlService';

function AuthDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleShorten = async (formValues) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await shortenUrl(formValues);
      setResult(response);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

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
          </div>

          <div className="hero-card">
            <div className="card-header">
              <div>
                <h2>Create Short Link</h2>
                <p>Paste your long URL and generate a shareable short link instantly.</p>
              </div>
              <span className="status-chip">Live API</span>
            </div>

            <UrlForm onSubmit={handleShorten} isLoading={isLoading} />

            {isLoading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {result && !isLoading && <ResultCard result={result} />}
          </div>
        </section>

        <Dashboard refreshKey={refreshKey} />
        <InsightsDashboard />
      </div>
    </main>
  );
}

export default AuthDashboard;
