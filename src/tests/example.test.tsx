import "@testing-library/jest-dom";
import App from "../components/App";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
jest.mock("../utils/config", () => ({
  TOKEN_API: process.env.VITE_TOKEN_API,
}));
describe("App", () => {
  test("should render the App component with the Start page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Verifica que el texto "Start" esté presente en la pantalla
    expect(screen.getByText(/Start/i)).toBeInTheDocument();
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});
