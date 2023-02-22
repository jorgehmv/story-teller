export interface IReader {
  read(): Promise<string>;
}
