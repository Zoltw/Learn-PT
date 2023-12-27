import { User, UserInterface } from '../models/user';
import bcrypt from 'bcrypt';

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

export const loginUser = async (email: string, password: string): Promise<UserInterface | Error | null> => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;
  return user;
};

export const getUser = async (userId: string): Promise<UserInterface | null> => {
  return await User.findById(userId);
};

export const updateUser = async (userId: string, userData: Partial<UserInterface>): Promise<UserInterface | null> => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  return await User.findByIdAndUpdate(userId, userData, { new: true });
};
