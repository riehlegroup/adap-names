export class File {

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