import { prisma } from "@dalifabooks/db";

export abstract class BaseJob {
  abstract readonly name: string;
  protected readonly prisma = prisma;

  abstract run(): Promise<void>;

  protected log(msg: string) {
    console.log(`[${new Date().toISOString()}][${this.name}] ${msg}`);
  }

  protected logError(msg: string, err?: unknown) {
    console.error(`[${new Date().toISOString()}][${this.name}] ${msg}`, err ?? "");
  }
}
