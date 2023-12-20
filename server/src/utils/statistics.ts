interface UserStats {
  userId: string;
  sessionCount: number;
  totalTimeSpent: number;
  knownWordsCount: number;
  unknownWordsCount: number;
  averagePerformance: number;
  streak: number;
  lastSessionDate: Date;
  lessonTypes: Map<string, number>;
  errorTypes: Map<string, number>;
  feedbackRatings: Array<number>;
}

interface SessionStats {
  sessionId: string;
  userId: string;
  date: Date;
  duration: number;
  knownWords: Array<string>;
  unknownWords: Array<string>;
  performance: number;
  lessonType: string;
  errorTypes: Array<string>;
  feedbackRating: number;
}

export class Statistics {
  private userStats: Map<string, UserStats>;
  private sessionStats: Map<string, SessionStats>;

  constructor() {
    this.userStats = new Map<string, UserStats>();
    this.sessionStats = new Map<string, SessionStats>();
  }

  addUserStats(userId: string): void {
    if (!this.userStats.has(userId)) {
      this.userStats.set(userId, {
        userId: userId,
        sessionCount: 0,
        totalTimeSpent: 0,
        knownWordsCount: 0,
        unknownWordsCount: 0,
        averagePerformance: 0,
        streak: 0,
        lastSessionDate: new Date(),
        lessonTypes: new Map<string, number>(),
        errorTypes: new Map<string, number>(),
        feedbackRatings: [],
      });
    }
  }

  addSessionStats(session: SessionStats): void {
    this.sessionStats.set(session.sessionId, session);
    this.updateUserStats(session);
  }

  private updateUserStats(session: SessionStats): void {
    const userStat = this.userStats.get(session.userId);
    if (userStat) {
      userStat.sessionCount += 1;
      userStat.totalTimeSpent += session.duration;
      userStat.knownWordsCount += session.knownWords.length;
      userStat.unknownWordsCount += session.unknownWords.length;
      userStat.averagePerformance = (userStat.averagePerformance * (userStat.sessionCount - 1) + session.performance) / userStat.sessionCount;
      userStat.lessonTypes.set(session.lessonType, (userStat.lessonTypes.get(session.lessonType) || 0) + 1);

      session.errorTypes.forEach((errorType) => {
        userStat.errorTypes.set(errorType, (userStat.errorTypes.get(errorType) || 0) + 1);
      });

      const lastSessionDate = new Date(userStat.lastSessionDate);
      const currentDate = new Date(session.date);
      if (this.isConsecutiveDay(lastSessionDate, currentDate)) {
        userStat.streak += 1;
      } else {
        userStat.streak = 1;
      }
      userStat.lastSessionDate = currentDate;
      userStat.feedbackRatings.push(session.feedbackRating);

      this.userStats.set(session.userId, userStat);
    }
  }

  private isConsecutiveDay(previousDate: Date, currentDate: Date): boolean {
    const diffTime = Math.abs(currentDate.getTime() - previousDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
  }

  getUserStats(userId: string): UserStats | undefined {
    return this.userStats.get(userId);
  }

  getSessionStats(sessionId: string): SessionStats | undefined {
    return this.sessionStats.get(sessionId);
  }

  getUserLessonTypeStats(userId: string): Map<string, number> | undefined {
    const userStat = this.userStats.get(userId);
    return userStat ? userStat.lessonTypes : undefined;
  }

  getUserErrorTypeStats(userId: string): Map<string, number> | undefined {
    const userStat = this.userStats.get(userId);
    return userStat ? userStat.errorTypes : undefined;
  }

  getUserAverageFeedback(userId: string): number | undefined {
    const userStat = this.userStats.get(userId);
    if (userStat && userStat.feedbackRatings.length > 0) {
      const totalFeedback = userStat.feedbackRatings.reduce((acc, rating) => acc + rating, 0);
      return totalFeedback / userStat.feedbackRatings.length;
    }
    return undefined;
  }
}

