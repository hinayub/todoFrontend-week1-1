import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import { describe, it, expect } from "vitest";

describe("Login Form Validation", () => {
  it("accepts a valid email", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText(/email address/i);

    emailInput.value = "hina@example.com";

    expect(emailInput.checkValidity()).toBe(true);
  });

  it("reject an invalid email", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    const emailInput = screen.getByLabelText(/email address/i);
    emailInput.value = "hina123";
    expect(emailInput.checkValidity()).toBe(false);
  });

  it("accepts a password with at least 8 characters", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const passwordInput = screen.getByLabelText(/password/i);

    passwordInput.value = "password123";

    expect(passwordInput.checkValidity()).toBe(true);
  });

  it("rejects a password shorter than 8 characters", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const passwordInput = screen.getByLabelText(/password/i);

    passwordInput.value = "1234567";

    expect(passwordInput.checkValidity()).toBe(false);
  });
});
