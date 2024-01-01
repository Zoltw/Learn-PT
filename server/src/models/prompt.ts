interface Prompt {
  baseLanguage: string;
  learnLanguage: string;
  goal: string;
  knownWords: Array<string>;
  unknownWords: Array<string>;
  performance: number;
}
