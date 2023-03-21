import { IReader } from "../input/reader";
import { IDisplayer } from "../output/displayer";
import { ElementType } from "../story/element";
import { addHero, addSetting, addVillain } from "./repository";

export const admin = async (reader: IReader, displayer: IDisplayer) => {
  while (true) {
    await inputFlow(reader, displayer);
  }
};

async function inputFlow(reader: IReader, displayer: IDisplayer) {
  await displayer.display("enter new card id", "prompt");
  const cardId = await reader.read();

  await displayer.display(
    "Enter type (hero=1, villain=2, setting=3)",
    "prompt"
  );
  const typeInput = await reader.read();
  const type: ElementType =
    typeInput === "1" ? "hero" : typeInput === "2" ? "villain" : "setting";

  await displayer.display("enter description", "prompt");
  const description = await reader.read();

  if (type === "hero") {
    addHero(cardId, description);
  } else if (type === "villain") {
    addVillain(cardId, description);
  } else {
    addSetting(cardId, description);
  }

  await displayer.display(`Succesfully added ${type}`, "prompt");
}
