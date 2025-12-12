import mongoose, { Document, Schema } from 'mongoose';

export interface IAbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface ICharacter extends Document {
  characterId: string; // Short, memorable ID
  name: string;
  class: string;
  background: string;
  species: string;
  level: number;
  abilityScores: IAbilityScores;
  alignment: {
    lawChaos: 'lawful' | 'neutral' | 'chaotic';
    goodEvil: 'good' | 'neutral' | 'evil';
  };
  languages: string[];
  appearance?: string;
  lore?: string;
  createdAt: Date;
  updatedAt: Date;
}

const abilityScoresSchema = new Schema<IAbilityScores>({
  strength: { type: Number, required: true, min: 1, max: 30 },
  dexterity: { type: Number, required: true, min: 1, max: 30 },
  constitution: { type: Number, required: true, min: 1, max: 30 },
  intelligence: { type: Number, required: true, min: 1, max: 30 },
  wisdom: { type: Number, required: true, min: 1, max: 30 },
  charisma: { type: Number, required: true, min: 1, max: 30 }
}, { _id: false });

const characterSchema = new Schema<ICharacter>({
  characterId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  class: {
    type: String,
    required: true
  },
  background: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
    max: 20
  },
  abilityScores: {
    type: abilityScoresSchema,
    required: true
  },
  alignment: {
    lawChaos: {
      type: String,
      enum: ['lawful', 'neutral', 'chaotic'],
      required: true
    },
    goodEvil: {
      type: String,
      enum: ['good', 'neutral', 'evil'],
      required: true
    }
  },
  languages: {
    type: [String],
    default: []
  },
  appearance: {
    type: String,
    trim: true
  },
  lore: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model<ICharacter>('Character', characterSchema);
