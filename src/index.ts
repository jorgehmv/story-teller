import { RfidReader } from "./input/rfid-reader";

const reader = new RfidReader();
console.log("enter hero:");
const inputHero = reader.read();
console.log(inputHero);