import React from "react";
import { render, screen } from "@testing-library/react";
import UserList from "../UserList";

test("renders loading message", () => {
  render(<UserList />);
  const loadingElement = screen.getByText(/loading/i);
  expect(loadingElement).toBeInTheDocument();
});