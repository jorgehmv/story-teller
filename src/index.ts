import { ConsoleReader } from "./input/consoler-reader";
import { ConsoleDisplayer } from "./output/console-displayer";
import { Narrator } from "./story/narrator";
import dotenv from "dotenv";
import { RfidReader } from "./input/rfid-reader";

dotenv.config();
const mode = process.argv[2];

if (mode === "teller") {
  let storyTeller: Narrator;
  if (process.argv[3] === "dev") {
    storyTeller = new Narrator(new ConsoleReader(), new ConsoleDisplayer());
  } else if (process.argv[3] === "debug") {
    storyTeller = new Narrator(new RfidReader(), new ConsoleDisplayer());
  } else {
    // storyTeller = new StoryTeller(new RfidReader(), new EInkDisplayer());
    storyTeller = new Narrator(new ConsoleReader(), new ConsoleDisplayer());
  }

  storyTeller.start();
} else if (mode === "config") {
} else {
  console.error(`Unkown mode: ${mode}`);
}
