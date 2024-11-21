import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import HomePage from "./HomePage";

// Mock API response setup
describe("Homepage Component", () => {
  // test for img if there are img for each element
  it("should render images from API call", async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const images = await screen.findAllByRole("img");

    expect(images).toHaveLength(12);
  });
  // test for name if there are name on each element
  it("should render name from API call", async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const productNames = await screen.findAllByRole("heading", { level: 5 });
    productNames.forEach((name) => {
      expect(name).toHaveTextContent(/./);
    });
  });
  // test for price if there are price on each element
  it("should render price from API call", async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const productPrices = screen.getAllByText(/\S+/);
    productPrices.forEach((price) => {
      expect(price).toHaveTextContent(/\S+/);
    });
  });
});
