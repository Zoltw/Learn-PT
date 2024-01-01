import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { LearnButton } from '../../components/Button/LearnButton';
import { navigate } from '../../root/navigator';
import { screenApp } from '../screens';
import { sendStatisticsToService } from './serviceCom';

interface Question {
  word: string;
  answers: Array<string>;
  correctAnswer: string;
  known: boolean | null
}

// eslint-disable-next-line max-len, quotes
const questions = JSON.parse("[{\"word\": \"Ananas\", \"answers\": [\"Pineapple\", \"Banana\", \"Apple\", \"Orange\"], \"correctAnswer\": \"Pineapple\"}, {\"word\": \"Chomik\", \"answers\": [\"Rabbit\", \"Hamster\", \"Mouse\", \"Cat\"], \"correctAnswer\": \"Hamster\"}, {\"word\": \"Dziękuję\", \"answers\": [\"Please\", \"Thank you\", \"Welcome\", \"Sorry\"], \"correctAnswer\": \"Thank you\"}, {\"word\": \"Do widzenia\", \"answers\": [\"Hello\", \"Goodbye\", \"See you\", \"Good night\"], \"correctAnswer\": \"Goodbye\"}, {\"word\": \"Cześć\", \"answers\": [\"Bye\", \"Cheers\", \"Hello\", \"Good evening\"], \"correctAnswer\": \"Hello\"}, {\"word\": \"Pomarańcza\", \"answers\": [\"Grapefruit\", \"Peach\", \"Orange\", \"Lemon\"], \"correctAnswer\": \"Orange\"}, {\"word\": \"Kot\", \"answers\": [\"Dog\", \"Cat\", \"Horse\", \"Cow\"], \"correctAnswer\": \"Cat\"}, {\"word\": \"Jabłko\", \"answers\": [\"Pear\", \"Banana\", \"Apple\", \"Cherry\"], \"correctAnswer\": \"Apple\"}, {\"word\": \"Pies\", \"answers\": [\"Cat\", \"Mouse\", \"Dog\", \"Rabbit\"], \"correctAnswer\": \"Dog\"}, {\"word\": \"Książka\", \"answers\": [\"Magazine\", \"Book\", \"Newspaper\", \"Letter\"], \"correctAnswer\": \"Book\"}, {\"word\": \"Samochód\", \"answers\": [\"Bicycle\", \"Airplane\", \"Car\", \"Train\"], \"correctAnswer\": \"Car\"}]");


const LearningScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsData, setQuestionsData] = useState(questions);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animateFade = useCallback((toValue, callback?) => {
    Animated.timing(fadeAnim, {
      toValue,
      duration: toValue === 1 ? 500 : 300,
      useNativeDriver: true,
    }).start(callback);
  }, [fadeAnim]);

  const sendResultsToBackend = useCallback((updatedQuestions: Array<Question>) => {
    const knownWords = updatedQuestions.filter((q) => q.known === true).map((q) => q.word);
    const unknownWords = updatedQuestions.filter((q) => q.known === false).map((q) => q.word);

    // Send data to backend
    // sendStatisticsToService(knownWords, unknownWords)
    navigate(screenApp.SUMMARY, { knownWords, unknownWords });
  }, []);

  const handleAnswer = useCallback((answer: string) => {
    animateFade(0, () => {
      const isCorrect = answer === questionsData[currentQuestionIndex].correctAnswer;
      const updatedQuestions = [...questionsData];
      updatedQuestions[currentQuestionIndex].known = isCorrect;

      setQuestionsData(updatedQuestions);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        sendResultsToBackend(updatedQuestions);
      }

      animateFade(1);
    });
  }, [animateFade, currentQuestionIndex, questionsData, sendResultsToBackend]);

  useEffect(() => {
    animateFade(1);
  }, [currentQuestionIndex, animateFade]);

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
