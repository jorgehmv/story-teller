import { IDisplayer, Mode } from "./displayer";
import { spawn } from "child_process";
import path from "path";
import { v4 as uuidv4 } from "uuid";

let clearId: NodeJS.Timeout | null = null;

export class EInkDisplayer implements IDisplayer {
  private pendingText: string = "";

  async display(message: string, mode: Mode) {
    await this.showText(message, mode);

    this.scheduleRefresh(message, mode);
  }

  hasPending(): boolean {
    return !!this.pendingText;
  }

  async displayPending(): Promise<void> {
    if (this.hasPending()) {
      await this.display(this.pendingText, "story");
    }
  }

  private async showText(text: string, mode: Mode) {
    const pythonFilePath = path.join(__dirname, "e-ink-lib", "display.py");
    const processId = uuidv4();
    const pyProcess = spawn("python3", [pythonFilePath, text, mode, processId]);

    const successCode = `${processId}_success`;
    const paginationCode = `${processId}_continue`;
    return new Promise<void>((resolve) => {
      pyProcess.stdout.on("data", (data) => {
        const dataString: string = data.toString();
        if (dataString.match(successCode)) {
          this.pendingText = "";
          resolve();
        } else if (dataString.match(paginationCode)) {
          const index = dataString.indexOf(paginationCode);
          this.pendingText = dataString.substring(
            index + paginationCode.length
          );
          resolve();
        }
      });

      pyProcess.stderr.on("data", (_data) => {
        resolve();
      });
    });
  }

  private scheduleRefresh(text: string, mode: Mode) {
    if (clearId !== null) {
      clearTimeout(clearId);
    }

    clearId = setTimeout(() => this.display(text, mode), 1 * 60 * 60 * 1000);
  }
}
