// Assuming the functions are in a file named 'userServices.ts'
import bcrypt from 'bcrypt';
import { User, UserInterface } from '../../models/user';
import { createUser, getUser, loginUser } from '../userService';

jest.mock('../../models/user', () => ({
  User: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
    knownWords: [],
    unknownWords: [],
  })),
  findById: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user with a hashed password', async () => {
      const mockUserData = {
        email: 'test@example.com',
        password: 'password123',
      } as UserInterface;
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      const user = await createUser(mockUserData);

      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 10);
      expect(User).toHaveBeenCalledWith({ ...mockUserData, password: 'hashedPassword' });
      expect(user.save).toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    it('should return a user if login is successful', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'hashedPassword',
      } as UserInterface;
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const user = await loginUser('test@example.com', 'password123');

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(user).toEqual(mockUser);
    });

    it('should throw an error if user is not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(loginUser('test@example.com', 'password123')).rejects.toThrow('User not found');
    });

    it('should return null if password does not match', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'hashedPassword',
      } as UserInterface;
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const user = await loginUser('test@example.com', 'password123');

      expect(user).toBeNull();
    });
  });

  describe('getUser', () => {
    it('should return a user based on userId', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'hashedPassword',
      } as UserInterface;
      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const user = await getUser('123');

      expect(User.findById).toHaveBeenCalledWith('123');
      expect(user).toEqual(mockUser);
    });
  });
});

