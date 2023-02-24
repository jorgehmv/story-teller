import { IDisplayer, Mode } from "./displayer";
import { spawn } from "child_process";
import path from "path";

let clearId: NodeJS.Timeout | null = null;

export class EInkDisplayer implements IDisplayer {
  display(message: string, mode: Mode) {
    this.showText(message, mode);

    this.scheduleRefresh(message, mode);
  }

  private showText(text: string, mode: Mode) {
    const pythonFilePath = path.join(__dirname, "e-ink-lib", "display.py");
    spawn("python3", [pythonFilePath, text, mode]);
  }

  private scheduleRefresh(text: string, mode: Mode) {
    if (clearId !== null) {
      clearTimeout(clearId);
    }

    clearId = setTimeout(() => this.display(text, mode), 1 * 60 * 60 * 1000);
  }
}
