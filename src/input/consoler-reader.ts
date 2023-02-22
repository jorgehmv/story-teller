import { IReader } from "./reader";
import * as readline from "node:readline/promises";
import { stdin } from "node:process";

const rl = readline.createInterface({ input: stdin });

export class ConsoleReader implements IReader {
  async read(): Promise<string> {
    return await rl.question("");
  }
}
