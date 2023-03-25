import { ConsoleReader } from "../input/consoler-reader";
import { RfidReader } from "../input/rfid-reader";
import { IDisplayer } from "../output/displayer";
import { ElementType } from "../story/element";
import { addHero, addSetting, addVillain } from "./repository";

export const admin = async (
  consoleReader: ConsoleReader,
  rfidReader: RfidReader,
  displayer: IDisplayer
) => {
  while (true) {
    await inputFlow(consoleReader, rfidReader, displayer);
  }
};
async function inputFlow(
  consoleReader: ConsoleReader,
  rfidReader: RfidReader,
  displayer: IDisplayer
) {
  await displayer.display("enter new card id", "prompt");
  const cardId = await rfidReader.read();

  await displayer.display(
    "Enter type (hero=1, villain=2, setting=3)",
    "prompt"
  );
  const typeInput = await consoleReader.read();
  const type: ElementType =
    typeInput === "1" ? "hero" : typeInput === "2" ? "villain" : "setting";

  await displayer.display("enter description", "prompt");
  const description = await consoleReader.read();

  if (type === "hero") {
    addHero(cardId, description);
  } else if (type === "villain") {
    addVillain(cardId, description);
  } else {
    addSetting(cardId, description);
  }

  await displayer.display(`Succesfully added ${type}`, "prompt");
}
