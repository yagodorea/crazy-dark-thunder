import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>D&D Character Creator</h1>
        <p className="tagline">Create your perfect Dungeons & Dragons character</p>

        <div className="cta-buttons">
          <Link to="/create" className="btn btn-primary btn-large">
            Create New Character
          </Link>
          <Link to="/characters" className="btn btn-secondary btn-large">
            View Characters
          </Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>📚 Official D&D Rules</h3>
          <p>Based on the 2024 Player's Handbook with all official classes, species, and backgrounds</p>
        </div>

        <div className="feature-card">
          <h3>🎯 Step-by-Step Guidance</h3>
          <p>Easy 6-step process to create your character following official character creation rules</p>
        </div>

        <div className="feature-card">
          <h3>💾 Save & Manage</h3>
          <p>Save your characters with memorable IDs and access them anytime</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
