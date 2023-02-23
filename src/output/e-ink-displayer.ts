import { IDisplayer, Mode } from "./displayer";
import { spawn } from "child_process";

let clearId: NodeJS.Timeout | null = null;
let lastArgs: [string, Mode] = ["", "prompt"];

export class EInkDisplayer implements IDisplayer {
  display(message: string, mode: Mode) {
    this.showText(message, mode);

    this.scheduleRefresh(message, mode);
  }

  private showText(text: string, mode: Mode) {
    lastArgs = [text, mode];
  }

  private scheduleRefresh(text: string, mode: Mode) {
    if (clearId !== null) {
      clearTimeout(clearId);
    }

    clearId = setTimeout(() => this.display(text, mode), 1 * 60 * 60 * 1000);
  }
}
