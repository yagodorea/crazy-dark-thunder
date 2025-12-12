import { useEffect, useState } from 'react';
import { dataAPI } from '../../services/api';
import type { BackgroundInfo } from '../../types/character';

interface BackgroundSelectorProps {
  selectedBackground?: string;
  onSelect: (background: string) => void;
}

const BackgroundSelector = ({ selectedBackground, onSelect }: BackgroundSelectorProps) => {
  const [backgrounds, setBackgrounds] = useState<BackgroundInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBackgrounds = async () => {
      try {
        const data = await dataAPI.getBackgrounds();
        setBackgrounds(data);
      } catch (err) {
        setError('Failed to load backgrounds');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBackgrounds();
  }, []);

  if (loading) return <div className="loading">Loading backgrounds...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="background-selector">
      <p className="step-description">
        Your character's background represents how they spent their years leading up to a life of adventure.
      </p>

      <div className="background-list">
        {backgrounds.map((background) => (
          <div
            key={background.name}
            className={`background-item ${selectedBackground === background.name ? 'selected' : ''}`}
            onClick={() => onSelect(background.name)}
          >
            <h3>{background.name}</h3>
            <span className="source">{background.source}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundSelector;
