import {
  findHeroById,
  findSettingById,
  findVillainById,
  getPrompt,
} from "../config/repository";
import { IReader } from "../input/reader";
import { IDisplayer } from "../output/displayer";
import { IElement } from "./element";
import { getTextCompletion } from "./open-ai-client";

export class Narrator {
  constructor(
    private readonly reader: IReader,
    private readonly displayer: IDisplayer
  ) {}

  async start(): Promise<void> {
    await this.askingHero();
  }

  private async askingHero() {
    await this.displayer.display("¿Quién será la heroína?", "prompt");
    let hero: IElement | null;

    do {
      const userInput = await this.reader.read();
      hero = findHeroById(userInput);
    } while (!hero);

    await this.askingVillain(hero);
  }

  private async askingVillain(hero: IElement) {
    await this.displayer.display("¿Quién será la villana?", "prompt");
    let villain: IElement | null;

    do {
      const userInput = await this.reader.read();
      villain = findVillainById(userInput);
    } while (!villain);

    await this.askingSetting(hero, villain);
  }

  private async askingSetting(hero: IElement, villain: IElement) {
    await this.displayer.display("¿En dónde será la historia?", "prompt");
    let setting: IElement | null;
    do {
      const userInput = await this.reader.read();
      setting = findSettingById(userInput);
    } while (!setting);

    await this.tellStory(hero, villain, setting);
  }

  private async tellStory(
    hero: IElement,
    villain: IElement,
    setting: IElement
  ) {
    const prompt = getPrompt(hero, villain, setting);
    const story = await getTextCompletion(prompt, async () => {
      await this.displayer.display(
        "Ok, dame un momentito para recordar esa historia...",
        "prompt"
      );
    });

    await this.displayer.display(
      story || "can't come up with any story",
      "story"
    );

    do {
      await this.reader.read();

      if (this.displayer.hasPending()) {
        await this.displayer.displayPending();
      } else {
        break;
      }
    } while (true);

    await this.start();
  }
}
