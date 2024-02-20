import React from "react";
import { render, screen } from "@testing-library/react";
import SubmissionCardLecturerDashboard from "./SubmissionCardLecturerDashboard";

describe("SubmissionCardLecturerDashboard", () => {
  it("renders correctly with provided props", () => {
    const props = {
      groupName: "Sample Group",
      formattedDate: "2023-09-30",
      evaluatorIncharge: "Evaluator A",
      supervisorInCharge: "Supervisor B",
    };

    render(<SubmissionCardLecturerDashboard {...props} />);

    expect(screen.getByText("Sample Group")).toBeTruthy();
    expect(screen.getByText("2023-09-30")).toBeTruthy();
    expect(screen.getByText("Evaluator A")).toBeTruthy();
    expect(screen.getByText("Supervisor B")).toBeTruthy();
  });
});
