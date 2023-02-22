import Ajv, { JTDSchemaType } from "ajv/dist/jtd";
import { AllElementTypes, IElement } from "../story/element";

const elementSchema: JTDSchemaType<IElement> = {
  properties: {
    id: { type: "string" },
    description: { type: "string" },
    type: { enum: AllElementTypes.slice() },
  },
};
const ajv = new Ajv();
const validateElement = ajv.compile(elementSchema);

export const tryParseElement = (json: any): IElement | null => {
  if (validateElement(json)) {
    return json;
  }

  console.error(`invalid element json: ${validateElement.errors}`);
  return null;
};
