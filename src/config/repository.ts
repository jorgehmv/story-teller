import fs from "fs";
import { IElement } from "../story/element";
import { tryParseElement } from "./schema-validator";
import appRoot from "app-root-path";

const configPath = `${appRoot}/config`;
const configFilePaths = {
  heroes: `${configPath}/heroes.json`,
  villains: `${configPath}/villains.json`,
  settings: `${configPath}/settings.json`,
};

type ConfigFileType = keyof typeof configFilePaths;
type ConfigFile = { [key: string]: IElement };

function readConfig(type: ConfigFileType): ConfigFile {
  const path = configFilePaths[type];

  if (!fs.existsSync(path)) {
    return {};
  }

  const data = fs.readFileSync(configFilePaths[type], "utf8");
  return data ? JSON.parse(data) : {};
}

function writeConfig(type: ConfigFileType, value: ConfigFile) {
  const data = JSON.stringify(value);
  fs.writeFileSync(configFilePaths[type], data);
}

function findById(id: string, type: ConfigFileType) {
  const allHeroes = readConfig(type);
  return tryParseElement(allHeroes[id]);
}

const addElementToConfig = (
  id: string,
  type: ConfigFileType,
  element: IElement
) => {
  const allElements = readConfig(type);
  allElements[id] = element;
  writeConfig(type, allElements);
};

export const findHeroById = (id: string): IElement | null => {
  return findById(id, "heroes");
};

export const findVillainById = (id: string): IElement | null => {
  return findById(id, "villains");
};

export const findSettingById = (id: string): IElement | null => {
  return findById(id, "settings");
};

export const addHero = (id: string, description: string): void => {
  const newHero: IElement = { id, description, type: "hero" };
  addElementToConfig(id, "heroes", newHero);
};

export const addVillain = (id: string, description: string): void => {
  const newVillain: IElement = { id, description, type: "villain" };
  addElementToConfig(id, "villains", newVillain);
};

export const addSetting = (id: string, description: string): void => {
  const newVillain: IElement = { id, description, type: "setting" };
  addElementToConfig(id, "settings", newVillain);
};

export const getPrompt = (
  hero: IElement,
  villain: IElement,
  setting: IElement
): string => {
  const rawPrompt = fs.readFileSync(`${configPath}/prompt.txt`, "utf8");
  return rawPrompt
    .replace("%hero%", hero.description)
    .replace("%villain%", villain.description)
    .replace("%setting%", setting.description);
};

export const isRestart = (id: string): boolean => {
  const rawActions = fs.readFileSync(`${configPath}/actions.json`, "utf8");
  const actions = JSON.parse(rawActions);

  return actions.restart === id;
};

export const isNext = (id: string): boolean => {
  const rawActions = fs.readFileSync(`${configPath}/actions.json`, "utf8");
  const actions = JSON.parse(rawActions);

  return actions.next === id;
};
