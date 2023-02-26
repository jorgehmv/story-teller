export type Mode = "prompt" | "story";
export interface IDisplayer {
  display(text: string, mode: Mode): Promise<void>;

  next(): Promise<void>;
}
