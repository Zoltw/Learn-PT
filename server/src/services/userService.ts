import bcrypt from 'bcrypt';
import { User, UserInterface } from '../models/user';

export const createUser = async (userData: UserInterface): Promise<UserInterface> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({ ...userData, password: hashedPassword });
  try {
    await user.save();
  } catch (error) {
    console.error('Error saving user:', error);
  }
  return user;
};

export const loginUser = async (email: string, password: string): Promise<UserInterface | null> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;
  return user;
};

export const getUser = async (userId: string): Promise<UserInterface | null> => {
  return await User.findById(userId);
};

export const updateUser = async (userId: string, updateFields: Partial<UserInterface>): Promise<UserInterface | null> => {
  try {
    const user = await getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const updateUserGoal = async (userId: string, userGoal: string): Promise<UserInterface | null> => {
  return updateUser(userId, { goal: userGoal });
};

export const updateUserLanguage = async (userId: string, baseLanguage: string, goalLanguage: string): Promise<UserInterface | null> => {
  return updateUser(userId, { baseLanguage, goalLanguage });
};

export const updateUserWords = async (userId: string, newKnownWords: Array<string>, newUnknownWords: Array<string>): Promise<UserInterface | null> => {
  try {
    const user = await getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const currentKnownWordsSet = new Set(user.knownWords || []);
    const currentUnknownWordsSet = new Set(user.unknownWords || []);

    newKnownWords.forEach((word) => {
      currentUnknownWordsSet.delete(word);
      currentKnownWordsSet.add(word);
    });

    newUnknownWords.forEach((word) => {
      currentKnownWordsSet.delete(word);
      currentUnknownWordsSet.add(word);
    });

    const updatedUser = await User.findByIdAndUpdate(userId, {
      knownWords: Array.from(currentKnownWordsSet),
      unknownWords: Array.from(currentUnknownWordsSet),
    }, { new: true });

    return updatedUser;
  } catch (error) {
    console.error('Error updating user words:', error);
    return null;
  }
};
