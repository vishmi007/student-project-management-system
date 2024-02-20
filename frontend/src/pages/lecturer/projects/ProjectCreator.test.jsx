import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useMutation } from "@tanstack/react-query";
import ProjectCreator from "./ProjectCreator";

// Mock the react-router-dom useNavigate function
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock the useAxiosPrivate hook
jest.mock("../../../hooks/useAxiosPrivate", () => () => ({
  post: jest.fn(),
}));

// Mock the useMutation hook
jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

describe("ProjectCreator Component", () => {
  beforeEach(() => {
    useMutation.mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
      isError: false,
    });
  });

  it("renders all input fields and buttons", () => {
    render(ProjectCreator);

    // Test if required elements are present
    expect(screen.getByLabelText("Name of Project")).toBeInTheDocument();
    expect(screen.getByLabelText("Unit Name")).toBeInTheDocument();
    // ... (similarly check for other elements)

    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("handles input change", () => {
    render(ProjectCreator);

    // Change the value of the input field
    userEvent.type(screen.getByLabelText("Name of Project"), "New Project");

    // Check if the input value changed
    expect(screen.getByLabelText("Name of Project")).toHaveValue("New Project");
  });

  it("submits form on Next button click", async () => {
    render(ProjectCreator);

    // Fill in form fields (similarly for other fields)
    userEvent.type(screen.getByLabelText("Name of Project"), "New Project");
    userEvent.type(screen.getByLabelText("Unit Name"), "Unit 1");

    // Mock the useNavigate function
    const navigateMock = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(navigateMock);

    // Mock the axios post function
    useMutation.mockReturnValueOnce({
      mutate: jest.fn(async () => {
        // Simulate successful response
        return { data: { projectId: "123" } };
      }),
      isLoading: false,
      isError: false,
    });

    // Click the Next button
    userEvent.click(screen.getByText("Next"));

    // Wait for form submission and navigation
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("./templates");
    });
  });
});
