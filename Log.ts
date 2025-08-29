export class Log {
  private static colors = {
    green: "\x1b[32m",
    orange: "\x1b[33m", // no real orange, closest is yellow
    blue: "\x1b[34m",
    bold: "\x1b[1m",
    reset: "\x1b[0m",
  };
  static info(message: string, ...args: any[]): void {
    console.log(
      `${Log.colors.green}INFO:${Log.colors.reset} ${message}`,
      ...args
    );
  }

  static warn(message: string, ...args: any[]): void {
    console.warn(`%cWARN: ${message}`, Log.colors.orange, ...args);
    console.log(
      `${Log.colors.orange}WARN:${Log.colors.reset} ${message}`,
      ...args
    );
  }

  static debug(message: string, ...args: any[]): void {
    console.log(
      `${Log.colors.blue}DEBUG:${Log.colors.reset} ${message}`,
      ...args
    );
  }
}
