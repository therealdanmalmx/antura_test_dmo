import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../App.tsx";

describe("App", () => {
  it('renders the text "Get a user, any user!" ', () => {
    render(<App />);
    const heading = screen.getByRole("heading", {
      name: /Get a user, any user!/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
