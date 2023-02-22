import { IReader } from "./reader";
// import { SerialPort } from "serialport";
import HID from "node-hid";

export class RfidReader implements IReader {
  // async read(): Promise<string> {
  //   console.log("entered read");
  //   console.log(`opening at ${process.env.USB_SERIAL_PATH}`);
  //   var port = new SerialPort(
  //     {
  //       path: process.env.USB_SERIAL_PATH!,
  //       baudRate: 57600,
  //     },
  //     () => {
  //       console.log(`open callback: ${arguments}`);
  //     }
  //   );

  //   port.on("open", () => {
  //     console.log("opened");
  //   });

  //   console.log("created serial port");
  //   return await new Promise((resolve) => {
  //     port.on("error", (err) => {
  //       console.error(`port error: ${err}`);

  //     port.on("data", (data) => {
  //       console.log(`got data: ${data}`);
  //       resolve(data);
  //     });
  //   });
  // }

  async read(): Promise<string> {
    const devices = HID.devices();
    if (!process.env.USB_SERIAL_PATH && devices.length !== 1) {
      throw new Error(
        `not a single device to connect from. \nDevices count: ${devices.length}, USB_SERIAL_PATH: ${process.env.USB_SERIAL_PATH}`
      );
    }
    const path = process.env.USB_SERIAL_PATH ?? devices[0].path!;

    var device = new HID.HID(path);

    return await new Promise((resolve) => {
      device.on("data", function (data) {
        console.log(`got data: ${data}`);
        device.close();
        resolve(data);
      });

      device.on("error", function (err) {
        console.error(err);
      });
    });
  }
}
