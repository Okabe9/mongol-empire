export declare class Parsed {
    str: string;
    contents: Array<string>;
    index: number;
    constructor(str: string, d: string);
    _nextStr(): string;
    nextIntArr(): Array<number>;
    nextInt(): number;
    nextFloatArr(): Array<number>;
    nextFloat(): number;
    nextStrArr(): Array<string>;
    nextStr(): string;
}
