/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/indent */

import { UserInterface } from "../models/user";

const promptTemplate = {
    earlyPhase: "I want you to act as a language Teacher. Your response will be used in a mobile app for learning languages. Respond with my rules. ",
    mission: "Prepare a lesson depending on the user's goal, known and unknown words, and actual performance. It's your decision how many words will be to solve, but please a minimum of 15. Shuffle position of answers",
    rulesPrompt: "Response should always look like: ",
    exampleResponse: "[{\"word\": \"Ananas\", \"answers\": [\"Pineapple\", \"Banana\", \"Apple\", \"Orange\"], \"correctAnswer\": \"Pineapple\"}, {\"word\": \"Chomik\", \"answers\": [\"Rabbit\", \"Hamster\", \"Mouse\", \"Cat\"], \"correctAnswer\": \"Hamster\"}]. ",
    rules: "Respond to me always with JSON which will be readable for my code without any `\\`, '\n', '```json' etc. ",
    baseLang: "Base language is ",
    wantLearn: ". and I want to learn ",
    goal: ". My language level goal is ",
    knownWords: ". I've already known these words: ",
    knownDisclaimer: " and please do not repeat these words in your response.",
    unknownWords: " Still don't know these words: ",
    unknownWordsFallback: ". I still don't know these words: ",
    examplePrompt: "I want you to act as a language Teacher.  You're response will be used in mobile app for learning languages. Response with my rules. Prepare lesson depending on the user goal, known and unknown words, and actual performance. It's your decision how much words will be to solve but please minimum 10. Response should always looks in this way: '[{\"word\": \"Ananas\", \"answers\": [\"Pineapple\", \"Banana\", \"Apple\", \"Orange\"], \"correctAnswer\": \"Pineapple\"}, {\"word\": \"Chomik\", \"answers\": [\"Rabbit\", \"Hamster\", \"Mouse\", \"Cat\"], \"correctAnswer\": \"Hamster\"}]'. Reponse me always with JSON which will be readable for my code wihout any `\\`, '\n', '```json' etc. Specs: Base language is English, I want to Learn Polish. My level language goal is C2, I've already know these words: ['Hello', 'Goodbye', 'Thank you', 'Banana', 'Apple']."
};

export const createPrompt = (user: UserInterface | null): string => {
    const {
        goal = 'B2',
        knownWords = [],
        unknownWords = [],
        baseLanguage = 'Polish',
        goalLanguage = 'English'
    } = user || {};

    if (user === null) {
        return promptTemplate.examplePrompt;
    }

    const basePart = `${promptTemplate.earlyPhase}${promptTemplate.mission}${promptTemplate.rulesPrompt}${promptTemplate.exampleResponse}${promptTemplate.rules}`;
    const languagePart = `${promptTemplate.baseLang}${baseLanguage}${promptTemplate.wantLearn}${goalLanguage}${promptTemplate.goal}${goal}`;

    if (!knownWords.length && !unknownWords.length) {
        return `${basePart}${languagePart}`;
    }

    const knownWordsPart = knownWords.length ? `${promptTemplate.knownWords}${knownWords.join(', ')}${promptTemplate.knownDisclaimer}` : '';
    const unknownWordsPart = unknownWords.length ? `${promptTemplate.unknownWords}${unknownWords.join(', ')}` : promptTemplate.unknownWordsFallback;

    if (knownWords.length && !unknownWords.length) {
        return `${basePart}${languagePart}${knownWordsPart}`;
    }

    return `${basePart}${languagePart}${knownWordsPart}${unknownWordsPart}`;
};
