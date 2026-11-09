export interface GuessResult {
  readonly bulls: number;
  readonly cows: number;
}

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  throw new Error(`Not implemented: secret ${secret}, guess ${guess}`);
};
