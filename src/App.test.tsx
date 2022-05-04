import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders equals button", () => {
  render(<App />);
  const equalsButton = screen.getByRole("button", { name: "=" });
  expect(equalsButton).toBeInTheDocument();
});
