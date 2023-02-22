import { IReader } from "./reader";

const debugExamples = ["vieja rata, sabia y alegre", "cat", "mountain"];
let debugCount = 0;

export class RfidReader implements IReader {
  async read(): Promise<string> {
    const index = debugCount++ % 3;
    return debugExamples[index];
  }
}
