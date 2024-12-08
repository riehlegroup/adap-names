export interface File {

    isEmpty(): boolean;
    isOpen(): boolean;
    isClosed(): boolean;

    read(): any[];
    write(data: any[]): void;
    delete(): void;

}