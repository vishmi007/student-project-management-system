import React from "react";
import { render } from "@testing-library/react";
import ProjectCalendar from "./ProjectCalendar";

describe("ProjectCalendar", () => {
  it("highlights selected project dates", () => {
    const selectedProject = {
      startDate: "2023-08-01",
      deadline: "2023-08-15",
    };

    const { container } = render(<ProjectCalendar selectedProject={selectedProject} />);

    // Check if the start date and end date are highlighted by checking for the CSS classes
    const startDateTiles = container.getElementsByClassName("highlighted-start-date");
    const endDateTiles = container.getElementsByClassName("highlighted-end-date");

    expect(startDateTiles.length).toBeGreaterThan(0);
    expect(endDateTiles.length).toBeGreaterThan(0);
  });
});
