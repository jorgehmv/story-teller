import { IReader } from "./reader";
import HID from "node-hid";

export class RfidReader implements IReader {
  async read(): Promise<string> {
    const device = this.getDevice();
    let value = "";

    return await new Promise((resolve) => {
      device.on("data", (bufferData) => {
        value += this.clean(bufferData);

        if (value.endsWith("(")) {
          device.close();
          const input = this.transform(value);
          resolve(input);
        }
      });
    });
  }

  private getDevice(): HID.HID {
    const devices = HID.devices();
    if (!process.env.USB_SERIAL_PATH && devices.length !== 1) {
      throw new Error(
        `not a single device to connect from. \nDevices count: ${devices.length}, USB_SERIAL_PATH: ${process.env.USB_SERIAL_PATH}`
      );
    }
    const path = process.env.USB_SERIAL_PATH ?? devices[0].path!;

    const device = new HID.HID(path);

    device.on("error", (err) => {
      console.error(err);
    });

    return device;
  }

  private clean(bufferData: any): string {
    return bufferData.toString().trim().replace(/\0/g, "");
  }

  private transform(value: string): string {
    return Array.from(value)
      .slice(0, -1)
      .map((c) => (c !== "'" ? String.fromCharCode(c.charCodeAt(0) + 19) : "0"))
      .join("");
  }
}
