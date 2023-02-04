import { Parsed } from "./Parsed";
/**
 * Parser class to help parse a input line of data
 */
export declare class Parser {
    delimiter: string;
    constructor(d?: string);
    setDelimeter(s: string): void;
    parse(str: string): Parsed;
}
