import {
  findHeroById,
  findSettingById,
  findVillainById,
  getPrompt,
  isRestart,
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
    this.displayer.display("enter hero id:");
    let hero: IElement | null;

    do {
      const userInput = await this.reader.read();
      hero = findHeroById(userInput);
    } while (!hero);

    await this.askingVillain(hero);
  }

  private async askingVillain(hero: IElement) {
    this.displayer.display("enter villain id:");
    let villain: IElement | null;

    do {
      const userInput = await this.reader.read();
      villain = findVillainById(userInput);
    } while (!villain);

    await this.askingSetting(hero, villain);
  }

  private async askingSetting(hero: IElement, villain: IElement) {
    this.displayer.display("enter setting id:");
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
    const story = await getTextCompletion(prompt);
    // TODO: paging?
    this.displayer.display(story || "can't come up with any story");

    const userInput = await this.reader.read();
    if (isRestart(userInput)) {
      await this.start();
    }
  }
}
