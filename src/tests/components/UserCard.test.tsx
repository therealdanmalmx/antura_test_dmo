import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router"; // use MemoryRouter to simulate routing
import UserProfileContext from "../../context/UserProfileContext";
import UserCard from "../../components/UserCard";
import { UserProfileTypes } from "../../types/types";

// Mock context values for testing
const mockAddToList = vi.fn();
const mockRemoveFromList = vi.fn();

const renderWithContext = (profile: UserProfileTypes, initialRoute: string) => {
  render(
    <MemoryRouter initialEntries={[initialRoute]} initialIndex={0}>
      {" "}
      {/* Set the initial route */}
      <UserProfileContext.Provider
        value={{
          addToList: mockAddToList,
          removeFromList: mockRemoveFromList,
          profile: profile,
          profileList: [],
          isLoading: false,
          hasError: false,
          getRandomUser: vi.fn(),
        }}
      >
        <UserCard profile={profile} />
      </UserProfileContext.Provider>
    </MemoryRouter>
  );
};

describe("UserCard Component", () => {
  const profile: UserProfileTypes = {
    results: [
      {
        id: { value: "1" },
        name: { first: "John", last: "Doe" },
        location: { city: "City", state: "State", country: "Country" },
        email: "john.doe@example.com",
        cell: "123-456-7890",
        picture: { large: "https://example.com/john.jpg" },
      },
    ],
  };

  it("renders the user's name, location, email, and cell", () => {
    renderWithContext(profile, "/");

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/City/)).toBeInTheDocument();
    expect(screen.getByText(/State/)).toBeInTheDocument();
    expect(screen.getByText(/Country/)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/123-456-7890/)).toBeInTheDocument();
  });

  it("renders the user's profile picture", () => {
    renderWithContext(profile, "/");

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/john.jpg");
  });

  it("shows 'Add to List' button on the home page", () => {
    renderWithContext(profile, "/");

    expect(
      screen.getByRole("button", { name: /Add to List/i })
    ).toBeInTheDocument();
  });

  it("calls `addToList` when 'Add to List' is clicked", () => {
    renderWithContext(profile, "/");

    const button = screen.getByRole("button", { name: /Add to List/i });
    fireEvent.click(button);

    expect(mockAddToList).toHaveBeenCalled();
  });

  it("shows 'Remove from list' button on the '/list' page", () => {
    renderWithContext(profile, "/list");

    expect(
      screen.getByRole("button", { name: /Remove from list/i })
    ).toBeInTheDocument();
  });

  it("calls `removeFromList` when 'Remove from list' is clicked", () => {
    renderWithContext(profile, "/list");

    const button = screen.getByRole("button", { name: /Remove from list/i });
    fireEvent.click(button);

    expect(mockRemoveFromList).toHaveBeenCalledWith("1"); // Calls with the user's id
  });

  it("does not show buttons when the pathname is different", () => {
    renderWithContext(profile, "/another-path");

    expect(screen.queryByText(/Add to List/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Remove from list/i)).not.toBeInTheDocument();
  });
});
