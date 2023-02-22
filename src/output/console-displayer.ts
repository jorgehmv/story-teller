import { IDisplayer } from "./displayer";

export class ConsoleDisplayer implements IDisplayer {
  display(text: string): void {
    console.log(text);
  }
}
