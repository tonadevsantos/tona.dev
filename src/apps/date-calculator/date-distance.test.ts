import { describe, it, expect } from "vitest";
import { calculateDistance } from "./date-distance";

function fabricateDateDistanceForm(start: string, end: string) {
  const form = new FormData();
  form.set("start-date-calendar", start);
  form.set("end-date-calendar", end);
  return form;
}

describe("calculateDistance", () => {
  it.skip("returns null when start date is invalid", () => {
    const form = fabricateDateDistanceForm("invalid", "2022-01-01");
    expect(calculateDistance(form)).toBeNull();
  });

  it("returns valid distance", () => {
    const form = fabricateDateDistanceForm("05/01/1991", "05/10/1992");

    expect(calculateDistance(form)).toEqual({
      when: "future",
      distance: [
        { unit: "years", value: 1 },
        { unit: "days", value: 9 },
      ],
    });
  });
});
