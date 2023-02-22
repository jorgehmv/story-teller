import { IReader } from "./reader";
import { SerialPort } from "serialport";

export class RfidReader implements IReader {
  async read(): Promise<string> {
    console.log("entered read");
    var sp = new SerialPort({
      path: process.env.USB_SERIAL_PATH!,
      baudRate: 4800,
    });

    console.log("created serial port");
    return await new Promise((resolve) => {
      sp.on("data", (data) => {
        console.log(`got data: ${data}`);
        resolve(data);
      });
    });
  }
}
