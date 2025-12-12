export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Alignment {
  lawChaos: 'lawful' | 'neutral' | 'chaotic';
  goodEvil: 'good' | 'neutral' | 'evil';
}

export interface Character {
  characterId?: string;
  name: string;
  class: string;
  background: string;
  species: string;
  level: number;
  abilityScores: AbilityScores;
  alignment: Alignment;
  languages: string[];
  appearance?: string;
  lore?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClassInfo {
  name: string;
  source: string;
  primaryAbility: string;
  complexity: string;
  hd?: {
    number: number;
    faces: number;
  };
}

export interface RaceInfo {
  name: string;
  source: string;
  size?: string[];
  speed?: {
    walk?: number;
    fly?: number;
  };
}

export interface BackgroundInfo {
  name: string;
  source: string;
}
