import mongoose from 'mongoose';

export interface SessionStatsInterface extends Document {
  sessionId: string;
  email: string;
  date: Date;
  duration: number;
  knownWords: Array<string>;
  unknownWords: Array<string>;
  performance: number;
}

const sessionStatsSchema = new mongoose.Schema<SessionStatsInterface>({
  sessionId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  knownWords: [{ type: String }],
  unknownWords: [{ type: String }],
  performance: { type: Number, required: true },
});

export const SessionStats = mongoose.model<SessionStatsInterface>('SessionStats', sessionStatsSchema);

