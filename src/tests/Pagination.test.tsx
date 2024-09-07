import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "../components/Pagination";
import "@testing-library/jest-dom";

describe("Pagination component", () => {
  const mockOnSelectPage = jest.fn();

  // Renderiza el componente Pagination con props de prueba
  test("should render pagination buttons", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onSelectPage={mockOnSelectPage}
      />
    );
    const numberOfPages = screen.getByText("2");
    expect(numberOfPages).toBeInTheDocument();
  });

  test('should disable "Previous" button on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onSelectPage={mockOnSelectPage}
      />
    );

    const prevButton = screen.getByTestId("btn-previous");
    expect(prevButton).toHaveClass("is-Disable");
  });
  test("should call onSelectPage when a page is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onSelectPage={mockOnSelectPage}
      />
    );

    fireEvent.click(screen.getByText("3"));
    expect(mockOnSelectPage).toHaveBeenCalledWith(3);
  });

  test('should render ("...") when there are more pages than visible', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onSelectPage={mockOnSelectPage}
      />
    );
    const dots = screen.getAllByTestId("btn-dots");
    expect(dots.length).toBeGreaterThan(0); // Checks if at least one dot exists
  });
  test('should include only page number without ("...") when not required', () => {
    render(
      <Pagination
        currentPage={4}
        totalPages={10}
        onSelectPage={mockOnSelectPage}
      />
    );
    const dots = screen.getAllByTestId("btn-dots");
    expect(dots.length).not.toContain("..."); // Checks if at
  });
  test("should call next page when clicked btn", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onSelectPage={mockOnSelectPage}
      />
    );

    const nextButton = screen.getByTestId("btn-next");
    fireEvent.click(nextButton);

    expect(mockOnSelectPage).toHaveBeenCalledWith(2);
  });
  test("should call previous page when clicked 'btn-previous'", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onSelectPage={mockOnSelectPage}
      />
    );

    const nextButton = screen.getByTestId("btn-previous");
    fireEvent.click(nextButton);

    expect(mockOnSelectPage).toHaveBeenCalledWith(1);
  });
});
