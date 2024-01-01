import * as StatisticsService from './statisticsService';

describe('Statistics Service', () => {
  beforeEach(() => {
    // Reset the data before each test
    // This depends on how you implement data reset in your service
    StatisticsService.resetData();
  });

  test('addUserStats should add a new user stat', () => {
    const userId = 'user123';
    StatisticsService.addUserStats(userId);
    const userStat = StatisticsService.getUserStats(userId);

    expect(userStat).toBeDefined();
    expect(userStat?.userId).toBe(userId);
    expect(userStat?.sessionCount).toBe(0);
    expect(userStat?.totalTimeSpent).toBe(0);
  });

  test('addSessionStats should update user stats and session stats', () => {
    const userId = 'user123';
    const sessionId = 'session123';
    const sessionData = {
      sessionId,
      userId,
      date: new Date(),
      duration: 30,
      knownWords: ['word1', 'word2'],
      unknownWords: ['word3'],
      performance: 80,
    };

    StatisticsService.addUserStats(userId);
    StatisticsService.addSessionStats(sessionData);

    const userStat = StatisticsService.getUserStats(userId);
    const sessionStat = StatisticsService.getSessionStats(sessionId);

    expect(sessionStat).toBeDefined();
    expect(sessionStat?.sessionId).toBe(sessionId);
    expect(userStat?.sessionCount).toBe(1);
    expect(userStat?.totalTimeSpent).toBe(30);
  });

  test('getUserStats should return undefined for non-existent user', () => {
    const userStat = StatisticsService.getUserStats('nonexistent');
    expect(userStat).toBeUndefined();
  });

  test('getSessionStats should return undefined for non-existent session', () => {
    const sessionStat = StatisticsService.getSessionStats('nonexistent');
    expect(sessionStat).toBeUndefined();
  });
});
