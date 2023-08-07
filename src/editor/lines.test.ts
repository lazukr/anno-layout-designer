import { expect, describe, it } from "@jest/globals";
import { getLineAttributeArgs, getLineArgs } from "./lines";

describe("getting line arguments.", () => {
    /*
        params:
        isHorizontal: boolean
        index: number
        max: number
        gridSize: number
    */

    it("should return horziontal line argument when passed one.", () => {
        const result = getLineArgs(true, 0, 5, 1);
        expect(result.x1).toEqual(0);
        expect(result.x2).toEqual(5);
        expect(result.y1).toEqual(0);
        expect(result.y2).toEqual(0);
    });

    it("should return vertical line argument when passed one.", () => {
        const result = getLineArgs(false, 0, 5, 1);
        expect(result.x1).toEqual(0);
        expect(result.x2).toEqual(0);
        expect(result.y1).toEqual(0);
        expect(result.y2).toEqual(5);
    });

    it("should return the line argument for the corresponding index.", () => {
        const result = getLineArgs(true, 2, 5, 1);
        expect(result.x1).toEqual(0);
        expect(result.x2).toEqual(5);
        expect(result.y1).toEqual(2);
        expect(result.y2).toEqual(2);
    });

    it("should return line arguments with calculated length based on grid size.", () => {
        const result = getLineArgs(true, 0, 5, 2);
        expect(result.x1).toEqual(0);
        expect(result.x2).toEqual(10);
        expect(result.y1).toEqual(0);
        expect(result.y2).toEqual(0);
    });
});

describe("getting line attribute arguments.", () => {

    it("throws RangeError when index greater max.", () => {
        const test = () => {
            getLineAttributeArgs(2, 1);
        }

        expect(test).toThrow(RangeError);
    });

    it("returns a bold line when index is 0.", () => {
        const result = getLineAttributeArgs(0, 1);
        expect(result.colour).toEqual("black");
        expect(result.width).toEqual(5);
    });

    it("returns a bold line when index is max.", () => {
        const result = getLineAttributeArgs(1, 1);
        expect(result.colour).toEqual("black");
        expect(result.width).toEqual(5);
    });

    it("returns a normal line when index is not 0 or max.", () => {
        const result = getLineAttributeArgs(1, 2);
        expect(result.colour).toEqual("black");
        expect(result.width).toEqual(0.25);
    });
});