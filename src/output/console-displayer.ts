import { IDisplayer, Mode } from "./displayer";

export class ConsoleDisplayer implements IDisplayer {
  display(text: string, _mode: Mode): void {
    console.log(text);
  }
}
