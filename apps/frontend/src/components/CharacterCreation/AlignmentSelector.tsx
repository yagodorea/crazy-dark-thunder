import type { Alignment } from '../../types/character';

interface AlignmentSelectorProps {
  alignment?: Alignment;
  onSelect: (alignment: Alignment) => void;
}

const AlignmentSelector = ({ alignment, onSelect }: AlignmentSelectorProps) => {
  const lawChaosOptions: Array<'lawful' | 'neutral' | 'chaotic'> = ['lawful', 'neutral', 'chaotic'];
  const goodEvilOptions: Array<'good' | 'neutral' | 'evil'> = ['good', 'neutral', 'evil'];

  const getAlignmentName = (lawChaos: string, goodEvil: string): string => {
    if (lawChaos === 'neutral' && goodEvil === 'neutral') {
      return 'True Neutral';
    }
    return `${lawChaos.charAt(0).toUpperCase() + lawChaos.slice(1)} ${goodEvil.charAt(0).toUpperCase() + goodEvil.slice(1)}`;
  };

  const handleSelect = (lawChaos: typeof alignment.lawChaos, goodEvil: typeof alignment.goodEvil) => {
    onSelect({ lawChaos, goodEvil });
  };

  return (
    <div className="alignment-selector">
      <p className="step-description">
        Alignment is a shorthand for your character's moral compass. It represents your character's
        general ethical and moral attitudes.
      </p>

      <div className="alignment-grid">
        {lawChaosOptions.map((lc) => (
          goodEvilOptions.map((ge) => (
            <div
              key={`${lc}-${ge}`}
              className={`alignment-option ${
                alignment?.lawChaos === lc && alignment?.goodEvil === ge ? 'selected' : ''
              }`}
              onClick={() => handleSelect(lc, ge)}
            >
              <h3>{getAlignmentName(lc, ge)}</h3>
            </div>
          ))
        ))}
      </div>

      <div className="alignment-help">
        <h4>Alignment Guide:</h4>
        <ul>
          <li><strong>Lawful:</strong> Respects authority, tradition, and order</li>
          <li><strong>Neutral:</strong> Balanced or indifferent to law/chaos</li>
          <li><strong>Chaotic:</strong> Values personal freedom and flexibility</li>
          <li><strong>Good:</strong> Compassionate, altruistic, respects life</li>
          <li><strong>Evil:</strong> Selfish, willing to hurt others for gain</li>
        </ul>
      </div>
    </div>
  );
};

export default AlignmentSelector;
