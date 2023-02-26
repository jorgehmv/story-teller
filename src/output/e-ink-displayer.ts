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
    console.log("$$$$$$", this.pendingText);
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
    console.log("starting");
    return new Promise<void>((resolve) => {
      pyProcess.stdout.on("data", (data) => {
        console.log("receiving");
        const dataString: string = data.toString();
        console.log(
          dataString,
          successCode,
          dataString.match(successCode),
          paginationCode,
          dataString.match(paginationCode)
        );
        if (dataString.match(successCode)) {
          this.pendingText = "";
          resolve();
        } else if (dataString.match(paginationCode)) {
          console.log("matched pagination");
          const index = dataString.indexOf(paginationCode);
          console.log(`at index ${index}`);
          this.pendingText = dataString.substring(
            index + paginationCode.length
          );
          console.log(`pending: ${this.pendingText}`);
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

/*
const {spawn}=require("child_process");
let text = `Érase una vez, en lo alto de una montaña nevada y lúgubre, un pequeño grupo de alegres ratas que vivían tranquilamente. Un día, un joven gato egoísta y embustero llegó a la montaña con la intención de hacerse con el control de los territorios que las ratas habían conquistado con tanto esfuerzo.

Las ratas, atemorizadas por el gato, decidieron pedir ayuda a su más sabia anciana. La vieja rata era muy inteligente y amable y todos la respetaban mucho. Cuando escuchó la historia del gato, decidió reunir a todas las ratas para enfrentar al intruso juntos.

Los animales se reunieron en la cima de la montaña y se dispusieron a enfrentarse al gato. La vieja rata les dijo que el reto no sería fácil, pero que todos debían trabajar juntos para vencer al egoísta rival. Entonces empezaron los preparativos: armaron trampas para estrellarle contra los árboles, le lanzaron piedras para distraerlo y usaron sus cuerpos en bloque para bloquear su camino.

El gato se quedó sorprendido ante estos pequeños animales que osaban desafiarlo. Al ver su valentía se dio cuenta de lo equivocado que había estado al intentar dominarlos sin pedirles permiso primero. Se disculpó por su comportamiento egoísta y les ofreció su amistad como gesto de buena voluntad. Las ratas lo aceptaron y desde entonces han vivido en armonía juntos en lo alto de la montaña nevada y lúgubre.`;

const pythonFilePath = "/home/pi/story-teller/build/output/e-ink-lib/display.py";
const processId = "id___"
const pyProcess = spawn("python3", [pythonFilePath, text, "story", processId]);

pyProcess.stdout.on("data", function (data) {
        const dataString = data.toString();
        const successCode = `${processId}_continue`;
        const paginationCode = `${processId}_continue`;

        console.log(
          dataString,
          successCode,
          dataString.match(successCode),
          paginationCode,
          dataString.match(paginationCode)
        );
});

pyProcess.stderr.on("data", (data) => {
  console.log(data.toString());
});


*/
