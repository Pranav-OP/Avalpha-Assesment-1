import logo from './logo.png';
import './App.css';
import { useState } from 'react';

function App() {

  // const API_BASE_URL = "https://localhost:5000";

  const [formData, setFormData] = useState({
    localSalesCount: '',
    foreignSalesCount: '',
    averageSaleAmount: ''
  });

  const [results, setResults] = useState({
    avalphaTechnologiesCommission: '',
    competitorCommission: '',
    advantage: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setFormErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateInputs = () => {
    const { localSalesCount, foreignSalesCount, averageSaleAmount } = formData;
    const errors = {};

    const toNum = (val) => Number(val || 0);

    const local = toNum(localSalesCount);
    const foreign = toNum(foreignSalesCount);
    const avg = toNum(averageSaleAmount);

    // Local sales validations
    if (!localSalesCount) errors.localSalesCount = "Required field.";
    else if (isNaN(local) || local < 0) errors.localSalesCount = "Must be a valid positive number.";
    else if (local > 10000) errors.localSalesCount = "Should not exceed 10,000.";

    // Foreign sales validations
    if (!foreignSalesCount) errors.foreignSalesCount = "Required field.";
    else if (isNaN(foreign) || foreign < 0) errors.foreignSalesCount = "Must be a valid positive number.";
    else if (foreign > 10000) errors.foreignSalesCount = "Should not exceed 10,000.";

    // Average amount validations
    if (!averageSaleAmount) errors.averageSaleAmount = "Required field.";
    else if (isNaN(avg) || avg <= 0) errors.averageSaleAmount = "Must be greater than 0.";
    else if (avg > 1000000) errors.averageSaleAmount = "Should not exceed £1,000,000.";

    // Logical cross-check
    if (!errors.localSalesCount && !errors.foreignSalesCount && local === 0 && foreign === 0) {
      errors.localSalesCount = "At least one sale count must be > 0.";
      errors.foreignSalesCount = "At least one sale count must be > 0.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFormErrors({});

    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      const response = await fetch('https://localhost:5000/api/commision/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          localSalesCount: Number(formData.localSalesCount),
          foreignSalesCount: Number(formData.foreignSalesCount),
          averageSaleAmount: Number(formData.averageSaleAmount)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.title || 'Failed to calculate commission.');
      }

      const data = await response.json();

      setResults({
        avalphaTechnologiesCommission: data.avalpha.formattedTotal,
        competitorCommission: data.competitor.formattedTotal,
        advantage: data.formattedAdvantage
      });

    } catch (err) {
      console.error('Error calculating commission:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="Avalpha Technologies Logo" />
          <h1 className="company-title">Avalpha Technologies</h1>
          <h2 className="app-subtitle">Commission Calculator</h2>
        </div>
      </header>

      <main className="main-content">
        <div className="calculator-container">
          <div className="form-section">
            <h3>Sales Information</h3>
            <form onSubmit={handleSubmit} className="calculator-form">

              {/* Local Sales */}
              <div className="form-group">
                <label htmlFor="localSalesCount">Local Sales Count</label>
                <input
                  type="number"
                  id="localSalesCount"
                  name="localSalesCount"
                  min="0"
                  max="10000"
                  value={formData.localSalesCount}
                  onChange={handleInputChange}
                  placeholder="Enter number of local sales"
                  required
                />
                {formErrors.localSalesCount && (
                  <small className="field-error">{formErrors.localSalesCount}</small>
                )}
              </div>

              {/* Foreign Sales */}
              <div className="form-group">
                <label htmlFor="foreignSalesCount">Foreign Sales Count</label>
                <input
                  type="number"
                  id="foreignSalesCount"
                  name="foreignSalesCount"
                  min="0"
                  max="10000"
                  value={formData.foreignSalesCount}
                  onChange={handleInputChange}
                  placeholder="Enter number of foreign sales"
                  required
                />
                {formErrors.foreignSalesCount && (
                  <small className="field-error">{formErrors.foreignSalesCount}</small>
                )}
              </div>

              {/* Average Sale Amount */}
              <div className="form-group">
                <label htmlFor="averageSaleAmount">Average Sale Amount (£)</label>
                <input
                  type="number"
                  step="0.01"
                  id="averageSaleAmount"
                  name="averageSaleAmount"
                  min="0.01"
                  max="1000000"
                  value={formData.averageSaleAmount}
                  onChange={handleInputChange}
                  placeholder="Enter average sale amount"
                  required
                />
                {formErrors.averageSaleAmount && (
                  <small className="field-error">{formErrors.averageSaleAmount}</small>
                )}
              </div>

              <button
                type="submit"
                className={`calculate-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Calculating...' : 'Calculate Commission'}
              </button>
            </form>

            {/* Backend API error (not validation) */}
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="results-section">
            <h3>Commission Results</h3>
            <div className="results-grid">
              <div className="result-card avalpha-card">
                <div className="result-header">
                  <h4>Avalpha Technologies</h4>
                  <span className="commission-rates">Local: 20% | Foreign: 35%</span>
                </div>
                <div className="result-amount">
                  {results.avalphaTechnologiesCommission || '£0.00'}
                </div>
              </div>

              <div className="result-card competitor-card">
                <div className="result-header">
                  <h4>Competitor</h4>
                  <span className="commission-rates">Local: 2% | Foreign: 7.55%</span>
                </div>
                <div className="result-amount">
                  {results.competitorCommission || '£0.00'}
                </div>
              </div>
            </div>

            {results.advantage && (
              <div className="advantage-indicator">
                <p className="advantage-text">
                  Avalpha Technologies advantage: <strong>{results.advantage}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 Avalpha Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
