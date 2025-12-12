import { useState, useEffect } from 'react';
import type { Character } from '../../types/character';

interface DetailsFormProps {
  character: Partial<Character>;
  onUpdate: (updates: Partial<Character>) => void;
}

const DetailsForm = ({ character, onUpdate }: DetailsFormProps) => {
  const [name, setName] = useState(character.name || '');
  const [appearance, setAppearance] = useState(character.appearance || '');
  const [lore, setLore] = useState(character.lore || '');
  const [languages, setLanguages] = useState<string>(character.languages?.join(', ') || 'Common');

  useEffect(() => {
    onUpdate({
      name,
      appearance: appearance || undefined,
      lore: lore || undefined,
      languages: languages.split(',').map(l => l.trim()).filter(Boolean),
    });
  }, [name, appearance, lore, languages, onUpdate]);

  return (
    <div className="details-form">
      <p className="step-description">
        Fill in the final details about your character to bring them to life!
      </p>

      <div className="form-group">
        <label htmlFor="name">Character Name *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter character name"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="languages">Languages</label>
        <input
          id="languages"
          type="text"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          placeholder="e.g., Common, Elvish, Draconic"
          className="form-input"
        />
        <small>Separate multiple languages with commas</small>
      </div>

      <div className="form-group">
        <label htmlFor="appearance">Appearance</label>
        <textarea
          id="appearance"
          value={appearance}
          onChange={(e) => setAppearance(e.target.value)}
          placeholder="Describe your character's physical appearance..."
          className="form-textarea"
          rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="lore">Background Story</label>
        <textarea
          id="lore"
          value={lore}
          onChange={(e) => setLore(e.target.value)}
          placeholder="Tell your character's story..."
          className="form-textarea"
          rows={6}
        />
      </div>

      <div className="character-summary">
        <h3>Character Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <strong>Class:</strong> {character.class || 'Not selected'}
          </div>
          <div className="summary-item">
            <strong>Background:</strong> {character.background || 'Not selected'}
          </div>
          <div className="summary-item">
            <strong>Species:</strong> {character.species || 'Not selected'}
          </div>
          <div className="summary-item">
            <strong>Alignment:</strong> {character.alignment
              ? `${character.alignment.lawChaos} ${character.alignment.goodEvil}`
              : 'Not selected'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
