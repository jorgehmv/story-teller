import { getPrompt } from "../config/repository";
import { IElement } from "./element";
import { getTextCompletion } from "./open-ai-client";

export class Builder {
  constructor(
    private readonly hero: IElement,
    private readonly villain: IElement,
    private readonly setting: IElement
  ) {}

  async newStory(): Promise<string> {
    const prompt = getPrompt(this.hero, this.villain, this.setting);
    return (await getTextCompletion(prompt)) || "can't come up with any story";
  }
}
