export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    // mutation method: initialization
    // convenience: constructor
    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter !== undefined) {
            this.delimiter = delimiter;
        }
    }

    // query method: conversion
    // implemenation: composed
    public asNameString(delimiter: string = this.delimiter): string {
        let name: string = "";
        for (let i = 0; i < this.components.length; i++) {
            if (i != 0) {
                name += delimiter; // append the delimiter before the next component (not before the first)
            }
            name += this.components[i]; // always append the next component
        }
        return name;
    }

    // query method: getter
    // implemenation: primitive
    public getComponent(i: number): string {
        return this.components[i];
    }

    // mutation method: setter
    // implemenation: primitive
    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    // query method: getter
    // implemenation: primitive
    public getNoComponents(): number {
        return this.components.length; // who in their right mind would call this NoComponents? Call it getNumberOf.. or getComponentCount
    }

    // mutation method: command
    // implemenation: primitive??
    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c); // insert the component at the i-th position and push the rest back
    }

    // mutation method: command
    // implemenation: primitive??
    public append(c: string): void {
        this.components.push(c); // add the component to the end
    }

    // mutation method: command
    // implemenation: primitive??
    public remove(i: number): void {
        this.components.splice(i, 1); // remove the i-th component
    }

}