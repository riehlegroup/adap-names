import { File } from "./File";

export class ObjFile implements File {

    protected data: Object[] = [];
    protected length: number = 0;

    public isEmpty(): boolean {
      return this.length == 0;
    }

    public isOpen(): boolean {
      throw new Error("no implementation");
    }
  
    public isClosed(): boolean {
        throw new Error("no implementation");
    }
  
    public read(): Object[] {
      this.assertIsOpenFile();
      throw new Error("no implementation");
    }

    public write(data: Object[]): void {
      this.assertIsOpenFile();
      throw new Error("no implementation");
    }
  
    public delete(): void {
      this.assertIsClosedFile();
      throw new Error("no implementation");
    }

    protected assertIsOpenFile(): void {
        throw new Error("no implementation");
    }

    protected assertIsClosedFile(): void {
        throw new Error("no implementation");
    }

}