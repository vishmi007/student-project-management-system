import React from "react";
import { render, screen } from "@testing-library/react";
import SubmissionCard from "./SubmissionCard";

describe("SubmissionCard", () => {
  it("renders correctly with provided props", () => {
    const props = {
      groupName: "Sample Group",
      formattedDate: "2023-09-30",
      evaluatorIncharge: "Evaluator A",
    };

    render(<SubmissionCard {...props} />);

    expect(screen.getByText("Sample Group")).toBeTruthy();
    expect(screen.getByText("2023-09-30")).toBeTruthy();
    expect(screen.getByText("Evaluator A")).toBeTruthy();
  });
});
