export type Mode = "prompt" | "story";
export interface IDisplayer {
  display(text: string, mode: Mode): Promise<void>;

  hasPending(): boolean;

  displayPending(): Promise<void>;
}
