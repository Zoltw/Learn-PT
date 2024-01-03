import mongoose from 'mongoose';

export interface UserInterface extends mongoose.Document {
  email: string;
  password: string;
  baseLanguage: string;
  goalLanguage: string;
  goal?: string;
  sessionCount?: number;
  totalTimeSpent?: number;
  knownWords?: Array<string>;
  unknownWords?: Array<string>;
  averagePerformance?: number;
  streak?: number;
  lastSessionDate?: Date;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  baseLanguage: { type: String, required: false },
  goalLanguage: { type: String, required: false },
  goal: { type: String, required: false },
  sessionCount: { type: Number, required: false },
  totalTimeSpent: { type: Number, required: false },
  knownWords: { type: Array<string>, required: false },
  unknownWords: { type: Array<string>, required: false },
  averagePerformance: { type: Number, required: false },
  streak: { type: Number, required: false },
  lastSessionDate: { type: Date, required: false },
});

export const User = mongoose.model<UserInterface>('User', userSchema);
