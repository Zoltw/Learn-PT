interface CustomPrompt {
  screenType: string;
  instructions: string;
}

interface Prompt {
  baseLanguage: string;
  learnLanguage: string;
  levelOfHardness: string;
  goal: string;
  knownWords: Array<string>;
  unknownWords: Array<string>;
  performance: number;
  customInstructions: CustomPrompt;
}
