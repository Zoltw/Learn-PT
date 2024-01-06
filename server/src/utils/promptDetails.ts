/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/indent */

import { UserInterface } from "../models/user";

const promptTemplate = {
    languageTeacherIntro: "I am a language teacher, creating advanced ",
    targetLanguageLabel: " lessons for ",
    baseLanguageLabel: " speakers aiming for ",
    proficiencyLevelLabel: " proficiency. ",
    lessonDescription: "Each lesson should introduce new, challenging ",
    avoidBasicsNote: " words or phrases, avoiding basics like 'Hello', 'Goodbye', 'Thank you', 'Banana', and 'Apple'. ",
    lessonRule: "Please provide a minimum of 15 vocabulary items per lesson, formatted in a JSON array. ",
    itemStructure: "Each item should include a ",
    answerChoicesLabel: " word, four ",
    correctTranslationLabel: " answer choices, and the correct ",
    translationNote: " translation. ",
    jsonFormatNote: "The JSON should be clean and directly usable in a mobile app for language learning, without escape characters like newline characters '\n', or code block formatting '```json'. ",
    lessonTailoringNote: "Tailor the lessons to progressively build towards ",
    performanceConsideration: " proficiency, considering the user's current knowledge and performance.",
    responseFormatRule: "Response should always look like: ",
    jsonResponseExample: "[{\"word\": \"Ananas\", \"answers\": [\"Pineapple\", \"Banana\", \"Apple\", \"Orange\"], \"correctAnswer\": \"Pineapple\"}, {\"word\": \"Chomik\", \"answers\": [\"Rabbit\", \"Hamster\", \"Mouse\", \"Cat\"], \"correctAnswer\": \"Hamster\"}]. ",
    knownWordsPrefix: ". I've already known these words: ",
    knownWordsDisclaimer: " and please do not repeat these words in your response.",
    unknownWordsPrefix: " Still don't know these words: ",
    unknownWordsFallback: ". I still don't know these words: ",
    exampleUserPrompt: "I want you to act as a language Teacher. You're response will be used in mobile app for learning languages. Response with my rules. Prepare lesson depending on the user goal, known and unknown words, and actual performance. It's your decision how much words will be to solve but please minimum 15. Response should always looks in this way: '[{\"word\": \"Ananas\", \"answers\": [\"Pineapple\", \"Banana\", \"Apple\", \"Orange\"], \"correctAnswer\": \"Pineapple\"}, {\"word\": \"Chomik\", \"answers\": [\"Rabbit\", \"Hamster\", \"Mouse\", \"Cat\"], \"correctAnswer\": \"Hamster\"}]'. Reponse me always with JSON which will be readable for my code wihout any `\\`, '\n', '```json' etc. Specs: Base language is English, I want to Learn Polish. My level language goal is C1 proficiency, I've already know these words: ['Hello', 'Goodbye', 'Thank you', 'Banana', 'Apple']."
};

export const createPrompt = (user: UserInterface | null): string => {
    if (user === null) {
        return promptTemplate.exampleUserPrompt;
    }

    const { goal = 'B2', knownWords = [], unknownWords = [], baseLanguage = 'Polish', goalLanguage = 'English' } = user;

    const knownWordsExist = knownWords.length;
    const unknownWordsExist = unknownWords.length;
    const wordCondition = !knownWordsExist && unknownWordsExist;

    const knownWordsPart = knownWordsExist ? `${promptTemplate.knownWordsPrefix}[${knownWords.join(', ')}]${promptTemplate.knownWordsDisclaimer}` : '';
    const unknownWordsPart = unknownWordsExist ? `${wordCondition ? promptTemplate.unknownWordsFallback : promptTemplate.unknownWordsPrefix}[${unknownWords.join(', ')}]` : '';

    return `${promptTemplate.languageTeacherIntro}${goalLanguage}${promptTemplate.targetLanguageLabel}${baseLanguage}${promptTemplate.baseLanguageLabel}${goal}${promptTemplate.proficiencyLevelLabel}` +
           `${promptTemplate.lessonDescription}${goalLanguage}${promptTemplate.avoidBasicsNote}${promptTemplate.responseFormatRule}${promptTemplate.jsonResponseExample}${promptTemplate.lessonRule}` +
           `${promptTemplate.itemStructure}${goalLanguage}${promptTemplate.answerChoicesLabel}${baseLanguage}${promptTemplate.correctTranslationLabel}${baseLanguage}${promptTemplate.translationNote}` +
           `${promptTemplate.jsonFormatNote}${promptTemplate.lessonTailoringNote}${goal}${promptTemplate.performanceConsideration}` +
           `${knownWordsPart}${unknownWordsPart}`;
};

