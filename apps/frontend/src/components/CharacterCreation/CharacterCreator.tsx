import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import type { Character } from '../../types/character';
import ClassSelector from './ClassSelector';
import BackgroundSelector from './BackgroundSelector';
import SpeciesSelector from './SpeciesSelector';
import AbilityScoresStep from './AbilityScoresStep';
import AlignmentSelector from './AlignmentSelector';
import DetailsForm from './DetailsForm';
import { characterAPI } from '../../services/api';
import './CharacterCreator.css';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const STORAGE_KEY = 'dnd-character-draft';

const CharacterCreator = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize step from URL or default to 1
  const urlStep = parseInt(searchParams.get('step') || '1');
  const initialStep = (urlStep >= 1 && urlStep <= 6 ? urlStep : 1) as Step;

  const [currentStep, setCurrentStep] = useState<Step>(initialStep);

  // Load character from localStorage if available
  const [character, setCharacter] = useState<Partial<Character>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { level: 1, languages: [] };
      }
    }
    return { level: 1, languages: [] };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdCharacterId, setCreatedCharacterId] = useState<string | null>(null);

  // Save character to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
  }, [character]);

  // Update URL when step changes
  useEffect(() => {
    setSearchParams({ step: currentStep.toString() });
  }, [currentStep, setSearchParams]);

  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    if (!isFormComplete()) return;

    setIsSubmitting(true);
    try {
      const created = await characterAPI.create(character as Omit<Character, 'characterId' | 'createdAt' | 'updatedAt'>);
      setCreatedCharacterId(created.characterId || null);
      // Clear localStorage after successful creation
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to create character:', error);
      alert('Failed to create character. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCharacter = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCharacter({ level: 1, languages: [] });
    setCreatedCharacterId(null);
    setCurrentStep(1);
  };

  const isFormComplete = (): boolean => {
    return !!(
      character.name &&
      character.class &&
      character.background &&
      character.species &&
      character.abilityScores &&
      character.alignment
    );
  };

  const getStepTitle = (): string => {
    switch (currentStep) {
      case 1: return 'Choose a Class';
      case 2: return 'Choose a Background';
      case 3: return 'Choose a Species';
      case 4: return 'Determine Ability Scores';
      case 5: return 'Choose Alignment';
      case 6: return 'Fill in Details';
      default: return '';
    }
  };

  if (createdCharacterId) {
    return (
      <div className="character-creator">
        <div className="success-message">
          <h2>Character Created Successfully!</h2>
          <p>Character ID: <strong>{createdCharacterId}</strong></p>
          <p>Save this ID to retrieve your character later.</p>
          <div className="success-actions">
            <button onClick={resetCharacter} className="btn btn-primary">Create Another Character</button>
            <Link to="/characters" className="btn btn-secondary">View All Characters</Link>
            <Link to="/" className="btn btn-secondary">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="character-creator">
      <header className="creator-header">
        <h1>D&D Character Creator</h1>
        <div className="step-indicator">
          <span>Step {currentStep} of 6</span>
          <span className="step-title">{getStepTitle()}</span>
        </div>
      </header>

      <div className="creator-content">
        {currentStep === 1 && (
          <ClassSelector
            selectedClass={character.class}
            onSelect={(className) => updateCharacter({ class: className })}
          />
        )}

        {currentStep === 2 && (
          <BackgroundSelector
            selectedBackground={character.background}
            onSelect={(background) => updateCharacter({ background })}
          />
        )}

        {currentStep === 3 && (
          <SpeciesSelector
            selectedSpecies={character.species}
            onSelect={(species) => updateCharacter({ species })}
          />
        )}

        {currentStep === 4 && (
          <AbilityScoresStep
            abilityScores={character.abilityScores}
            onUpdate={(abilityScores) => updateCharacter({ abilityScores })}
          />
        )}

        {currentStep === 5 && (
          <AlignmentSelector
            alignment={character.alignment}
            onSelect={(alignment) => updateCharacter({ alignment })}
          />
        )}

        {currentStep === 6 && (
          <DetailsForm
            character={character}
            onUpdate={updateCharacter}
          />
        )}
      </div>

      <footer className="creator-footer">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="btn btn-secondary"
        >
          Previous
        </button>

        {currentStep < 6 ? (
          <button
            onClick={nextStep}
            className="btn btn-primary"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isFormComplete() || isSubmitting}
            className="btn btn-success"
          >
            {isSubmitting ? 'Creating...' : 'Create Character'}
          </button>
        )}
      </footer>
    </div>
  );
};

export default CharacterCreator;
