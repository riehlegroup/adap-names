export interface File {

    isEmpty(): boolean;
    isOpen(): boolean;
    isClosed(): boolean;

    open(): void;
    read(): any[];
    write(data: any[]): void;
    close(): void;
    delete(): void;

}