import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ProjectCard from "./ProjectCard";

describe("ProjectCard", () => {
  it("renders correctly", () => {
    const props = {
      projectName: "Sample Project",
      moduleName: "Module A",
      deadline: "2023-09-30",
      submissionType: "single",
      isSelected: false,
      onClick: jest.fn(),
    };

    render(<ProjectCard {...props} />);

    expect(screen.queryByText("Sample Project")).toBeTruthy();
    expect(screen.queryByText("Module A")).toBeTruthy();
    expect(screen.queryByText("2023-09-30")).toBeTruthy();
    expect(screen.queryByText("Single Submission")).toBeTruthy();
  });

  it("renders correctly when selected", () => {
    const props = {
      projectName: "Sample Project",
      moduleName: "Module A",
      deadline: "2023-09-30",
      submissionType: "single",
      isSelected: true,
      onClick: jest.fn(),
    };

    render(<ProjectCard {...props} />);

    const projectCard = screen.getByRole("project-card");
    expect(projectCard.classList.contains("selected")).toBe(true);
  });
});
