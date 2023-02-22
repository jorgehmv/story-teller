import { IDisplayer } from "./displayer";

export class EInkDisplayer implements IDisplayer {
  display(message: string) {
    console.log(message);
  }
}
