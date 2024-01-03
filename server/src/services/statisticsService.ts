import { User, UserInterface } from '../models/user';

const isConsecutiveDay = (previousDate: Date, currentDate: Date): boolean => {
  const diffTime = Math.abs(currentDate.getTime() - previousDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};


const calculateAveragePerformance = (user: UserInterface) => {
  return user.totalTimeSpent ? user.sessionCount! / user.totalTimeSpent : 0;
};


export const updateUserLessonStats = async (userId: string): Promise<void> => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.sessionCount = (user.sessionCount || 0) + 1;
  user.lastSessionDate = new Date();

  user.streak = isConsecutiveDay(user.lastSessionDate, new Date()) ? (user.streak || 0) + 1 : 1;

  user.averagePerformance = calculateAveragePerformance(user);

  await user.save();
};

export const getUserStats = async (userId: string): Promise<UserInterface | null> => {
  updateUserLessonStats(userId);
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
