import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { LearnButton } from '../../components/Button/LearnButton';
import { navigate } from '../../root/navigator';
import { screenApp } from '../screens';
import { getUserID } from '../../storage/storage';
import LoadingScreen from '../loading/loading';
import { fetchChatGPTResponseFromService } from '../../api/prompt';

interface Question {
  word: string;
  answers: Array<string>;
  correctAnswer: string;
  known: boolean | null;
}

const LearningScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsData, setQuestionsData] = useState<Array<Question>>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const shuffleArray = (array) => {
    const shuffledArray = Array.from(array);
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const animateFade = useCallback((toValue, callback?) => {
    Animated.timing(fadeAnim, {
      toValue,
      duration: toValue === 1 ? 500 : 300,
      useNativeDriver: true,
    }).start(callback);
  }, [fadeAnim]);

  const sendResultsToSummary = useCallback((updatedQuestions: Array<Question>) => {
    const knownWords = updatedQuestions.filter((q) => q.known === true).map((q) => q.word);
    const unknownWords = updatedQuestions.filter((q) => q.known === false).map((q) => q.word);

    navigate(screenApp.SUMMARY, { knownWords, unknownWords });
  }, []);

  const handleAnswer = useCallback((answer: string) => {
    animateFade(0, () => {
      const updatedQuestions = questionsData.map((question, index) => {
        if (index === currentQuestionIndex) {
          return { ...question, known: answer === question.correctAnswer };
        }
        return question;
      });

      setQuestionsData(updatedQuestions);

      if (currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        sendResultsToSummary(updatedQuestions);
      }

      animateFade(1);
    });
  }, [animateFade, currentQuestionIndex, questionsData, sendResultsToSummary]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserID();
        const response = await fetchChatGPTResponseFromService(userId);
        const { message } = response;
        const fetchedQuestions = message.lesson ? JSON.parse(message.lesson) : JSON.parse(message);

        if (Array.isArray(fetchedQuestions) && fetchedQuestions.length > 0) {
          const questionsWithShuffledAnswers = fetchedQuestions.map((question) => ({
            ...question,
            answers: shuffleArray(question.answers),
          }));

          setQuestionsData(questionsWithShuffledAnswers);
          setCurrentQuestionIndex(0);
        } else {
          console.error('Fetched data is not an array of questions');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    animateFade(1);
  }, [currentQuestionIndex, questionsData, animateFade]);

  if (!questionsData || questionsData.length === 0) {
    return <LoadingScreen />;
  }

  const question = questionsData[currentQuestionIndex];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        {question.word}
      </Animated.Text>
      <View style={styles.cont2}>
        {question.answers.map((answer, index) => (
          <Animated.View key={index} style={[styles.grid, { opacity: fadeAnim }]}>
            <LearnButton text={answer} onPressFunction={() => handleAnswer(answer)} />
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

export default LearningScreen;
