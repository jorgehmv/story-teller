import { IReader } from "./reader";
import { SerialPort } from "serialport";

export class RfidReader implements IReader {
  async read(): Promise<string> {
    console.log("entered read");
    var sp = new SerialPort({
      path: "/dev/tty.usbserial-0001",
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
