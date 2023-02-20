const debugExamples = ["vieja rata, sabia y alegre", "cat", "mountain"];
let debugCount = 0;

export class RfidReader {
  read(): string {
    const index = debugCount++ % 3;
    return debugExamples[index];
  }
}
