import { RfidReader } from "./rfid-input/reader";

const reader = new RfidReader();
console.log("enter hero:");
const inputHero = reader.read();
console.log(inputHero)