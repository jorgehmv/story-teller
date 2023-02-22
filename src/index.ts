import { ConsoleReader } from "./input/consoler-reader";
import { ConsoleDisplayer } from "./output/console-displayer";
import { Narrator } from "./story/narrator";
import dotenv from "dotenv";

dotenv.config();
const mode = process.argv[2];

if (mode === "teller") {
  let storyTeller: Narrator;
  if (process.argv[3] === "dev") {
    storyTeller = new Narrator(new ConsoleReader(), new ConsoleDisplayer());
  } else {
    // storyTeller = new StoryTeller(new RfidReader(), new EInkDisplayer());
    storyTeller = new Narrator(new ConsoleReader(), new ConsoleDisplayer());
  }

  storyTeller.start();
} else if (mode === "config") {
} else {
  console.error(`Unkown mode: ${mode}`);
}
