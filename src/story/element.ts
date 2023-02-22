export const AllElementTypes = ["hero", "villain", "setting"] as const;

type ElementType = (typeof AllElementTypes)[number];
export interface IElement {
  id: string;
  description: string;
  type: ElementType;
}
