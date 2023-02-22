import { IReader } from "./reader";
import { SerialPort } from "serialport";

export class RfidReader implements IReader {
  async read(): Promise<string> {
    console.log("entered read");
    console.log(`opening at ${process.env.USB_SERIAL_PATH}`);
    var port = new SerialPort(
      {
        path: process.env.USB_SERIAL_PATH!,
        baudRate: 57600,
      },
      () => {
        console.log(`open callback: ${arguments}`);
      }
    );

    port.on("open", () => {
      console.log("opened");
    });

    console.log("created serial port");
    return await new Promise((resolve) => {
      port.on("error", (err) => {
        console.error(`port error: ${err}`);
      });

      port.on("data", (data) => {
        console.log(`got data: ${data}`);
        resolve(data);
      });
    });
  }
}
