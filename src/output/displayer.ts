export type Mode = "prompt" | "story";
export interface IDisplayer {
  display(text: string, mode: Mode): void;
}
