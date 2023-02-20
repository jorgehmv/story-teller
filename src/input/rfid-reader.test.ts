import { RfidReader } from "./rfid-reader"

test("returns rat", () => {
    const reader = new RfidReader();
    expect(reader.read()).toMatch(/rata/);
})