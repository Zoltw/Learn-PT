import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';
import useTranslations from '../../hooks/useTranslations';
import { styles } from './styles';

const LoadingScreen = () => {
  const { translate } = useTranslations();
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;

  const startAnimation = useCallback((anim, delay) => {
    return Animated.sequence([
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration: 500,
        delay: 4500,
        useNativeDriver: true,
      }),
    ]);
  }, []);

  useEffect(() => {
    const animationSequence = Animated.loop(
      Animated.sequence([
        startAnimation(fadeAnim1, 3000),
        startAnimation(fadeAnim2, 0),
        startAnimation(fadeAnim3, 0),
      ]),
    );

    animationSequence.start();
  }, [fadeAnim1, fadeAnim2, fadeAnim3, startAnimation]);

  const textStyle = useMemo(() => ({
    ...styles.text,
    opacity: fadeAnim1,
  }), [fadeAnim1]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Animated.Text style={textStyle}>
        {translate('Patience is the key to learning! Your personalized language lessons are loading.')}
      </Animated.Text>
      <Animated.Text style={{ ...textStyle, opacity: fadeAnim2 }}>
        {translate('Loading your next linguistic adventure! Get ready to embrace new words and phrases.')}
      </Animated.Text>
      <Animated.Text style={{ ...textStyle, opacity: fadeAnim3 }}>
        {translate('Preparing your language learning journey... New challenges and achievements await!')}
      </Animated.Text>
    </View>
  );
};

export default LoadingScreen;
