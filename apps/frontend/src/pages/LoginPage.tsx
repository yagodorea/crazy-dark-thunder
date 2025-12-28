import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './LoginPage.css';

const LoginPage = () => {
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/validate', { apiKey: inputKey });
      if (response.data.valid) {
        login(inputKey);
      } else {
        setError('Invalid API key');
      }
    } catch (err) {
      setError('Failed to validate API key');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>D&D Character Creator</h1>
        <p className="subtitle">Enter your API key to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Enter API key"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={isLoading || !inputKey}>
            {isLoading ? 'Validating...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
