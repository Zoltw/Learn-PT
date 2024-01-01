import { SessionStats, SessionStatsInterface } from '../models/session';
import { User, UserInterface } from '../models/user';

const isConsecutiveDay = (previousDate: Date, currentDate: Date): boolean => {
  const diffTime = Math.abs(currentDate.getTime() - previousDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

const addUserStats = async (email: string): Promise<void> => {
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      user = new User({
        email: email,
        password: '',
        sessionCount: 0,
        totalTimeSpent: 0,
        knownWords: [],
        unknownWords: [],
        averagePerformance: 0,
        streak: 0,
        lastSessionDate: new Date(),
      });

      await user.save();
    }
  } catch (error) {
    console.error('Error in addUserStats:', error);
  }
};


const addSessionStats = async (session: SessionStatsInterface): Promise<void> => {
  try {
    const newSession = new SessionStats(session);
    await newSession.save();
    await updateUserStats(session);
  } catch (error) {
    console.error('Error in addSessionStats:', error);
  }
};

const updateUserStats = async (session: SessionStatsInterface): Promise<void> => {
  try {
    const user = await User.findOne({ email: session.email });

    if (user) {
      user.sessionCount = (user.sessionCount || 0) + 1;
      user.totalTimeSpent = (user.totalTimeSpent || 0) + session.duration;
      user.knownWords = user.knownWords ? [...user.knownWords, ...session.knownWords] : session.knownWords;
      user.unknownWords = user.unknownWords ? [...user.unknownWords, ...session.unknownWords] : session.unknownWords;
      user.averagePerformance = user.sessionCount > 0 ?
        ((user.averagePerformance || 0) * (user.sessionCount - 1) + session.performance) / user.sessionCount :
        session.performance;

      const lastSessionDate = new Date(user.lastSessionDate || 0);
      const currentDate = new Date(session.date);
      if (isConsecutiveDay(lastSessionDate, currentDate)) {
        user.streak = (user.streak || 0) + 1;
      } else {
        user.streak = 1;
      }
      user.lastSessionDate = currentDate;

      await user.save();
    }
  } catch (error) {
    console.error('Error in updateUserStats:', error);
  }
};

const getUserStats = async (email: string): Promise<UserInterface | null> => {
  return await User.findOne({ email });
};

const getSessionStats = async (sessionId: string): Promise<SessionStatsInterface | null> => {
  return await SessionStats.findOne({ sessionId });
};

export { addUserStats, addSessionStats, getUserStats, getSessionStats };
