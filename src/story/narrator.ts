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
    const userInput = await this.reader.read();

    const hero = findHeroById(userInput);
    if (hero) {
      await this.askingVillain(hero);
    }
  }

  private async askingVillain(hero: IElement) {
    this.displayer.display("enter villain id:");
    const userInput = await this.reader.read();

    const villain = findVillainById(userInput);
    if (villain) {
      await this.askingSetting(hero, villain);
    }
  }

  private async askingSetting(hero: IElement, villain: IElement) {
    this.displayer.display("enter setting id:");
    const userInput = await this.reader.read();

    const setting = findSettingById(userInput);
    if (setting) {
      await this.tellStory(hero, villain, setting);
    }
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
