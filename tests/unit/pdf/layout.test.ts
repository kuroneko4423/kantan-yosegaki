import { describe, expect, it } from "vitest";
import { computeColumns } from "@/features/pdf/layout";

describe("computeColumns", () => {
  it("returns 2 columns for 6 or fewer messages", () => {
    expect(computeColumns(1)).toBe(2);
    expect(computeColumns(3)).toBe(2);
    expect(computeColumns(6)).toBe(2);
  });

  it("returns 3 columns for 7 to 18 messages", () => {
    expect(computeColumns(7)).toBe(3);
    expect(computeColumns(10)).toBe(3);
    expect(computeColumns(18)).toBe(3);
  });

  it("returns 4 columns for 19 or more messages", () => {
    expect(computeColumns(19)).toBe(4);
    expect(computeColumns(25)).toBe(4);
    expect(computeColumns(100)).toBe(4);
  });
});
