import { ConsoleReader } from "./input/consoler-reader";
import { ConsoleDisplayer } from "./output/console-displayer";
import { Narrator } from "./story/narrator";
import dotenv from "dotenv";
import { RfidReader } from "./input/rfid-reader";
import { EInkDisplayer } from "./output/e-ink-displayer";
import { admin } from "./config/admin";

dotenv.config();
const mode = process.argv[2];

if (mode === "teller") {
  let storyTeller: Narrator;
  if (process.argv[3] === "dev") {
    storyTeller = new Narrator(new ConsoleReader(), new ConsoleDisplayer());
  } else if (process.argv[3] === "debug") {
    storyTeller = new Narrator(new RfidReader(), new ConsoleDisplayer());
  } else {
    storyTeller = new Narrator(new RfidReader(), new EInkDisplayer());
  }

  storyTeller.start();
} else if (mode === "config") {
  admin(new ConsoleReader(), new RfidReader(), new ConsoleDisplayer());
} else {
  console.error(`Unkown mode: ${mode}`);
}
