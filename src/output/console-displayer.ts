import { IDisplayer, Mode } from "./displayer";

export class ConsoleDisplayer implements IDisplayer {
  async display(text: string, _mode: Mode): Promise<void> {
    console.log(text);
  }
  hasPending(): boolean {
    return false;
  }
  async displayPending(): Promise<void> {}
}
