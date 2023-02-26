import { IDisplayer, Mode } from "./displayer";

export class ConsoleDisplayer implements IDisplayer {
  async display(text: string, _mode: Mode): Promise<void> {
    console.log(text);
  }
  async next(): Promise<void> {}
}
