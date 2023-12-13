interface CustomPrompt {
  screenType: string;
  instructions: string;
}

interface Prompt {
  baseLanguage: string;
  learnLanguage: string;
  levelOfHardness: string;
  goal: string;
  knownWords: string[];
  unknownWords: string[];
  performance: number;
  customInstructions: CustomPrompt;
}
