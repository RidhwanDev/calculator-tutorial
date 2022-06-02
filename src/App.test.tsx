import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("calculator tests", () => {
  test("renders calculator", () => {
    render(<App />);

    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("0");

    const buttons = screen.getAllByRole("button");

    expect(buttons.length).toBe(19);
    for (let i = 0; i < 9; i++) {
      expect(screen.getByRole("button", { name: `${i}` })).toBeInTheDocument();
    }

    expect(screen.getByRole("button", { name: "AC" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "C" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "*" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "÷" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "=" })).toBeInTheDocument();
  });

  test("Does addition correctly", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "0" }));
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    fireEvent.click(screen.getByRole("button", { name: "5" }));
    fireEvent.click(screen.getByRole("button", { name: "=" }));

    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("15");
  });

  test("Does substraction correctly", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "0" }));
    fireEvent.click(screen.getByRole("button", { name: "-" }));
    fireEvent.click(screen.getByRole("button", { name: "5" }));
    fireEvent.click(screen.getByRole("button", { name: "=" }));

    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("5");
  });

  test("Does multiply correctly", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "0" }));
    fireEvent.click(screen.getByRole("button", { name: "*" }));
    fireEvent.click(screen.getByRole("button", { name: "5" }));
    fireEvent.click(screen.getByRole("button", { name: "=" }));

    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("50");
  });

  test("Does division correctly", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "0" }));
    fireEvent.click(screen.getByRole("button", { name: "÷" }));
    fireEvent.click(screen.getByRole("button", { name: "5" }));
    fireEvent.click(screen.getByRole("button", { name: "=" }));

    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("2");
  });

  test("Does clear correctly", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "0" }));

    fireEvent.click(screen.getByRole("button", { name: "C" }));

    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("0");
  });

  test("Does AC correctly", () => {
    render(<App />);

    const plusButton = screen.getByRole("button", { name: "+" });

    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "0" }));
    fireEvent.click(plusButton);
    fireEvent.click(screen.getByRole("button", { name: "2" }));

    expect(plusButton).toHaveStyle({ borderColor: "#fff" });

    fireEvent.click(screen.getByRole("button", { name: "AC" }));

    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("0");
    expect(plusButton).not.toHaveStyle({ borderColor: "#fff" });
  });

  test("Does chain operations correctly", () => {
    render(<App />);

    const output = screen.getByTestId("output");
    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "0" }));
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    fireEvent.click(screen.getByRole("button", { name: "5" }));

    expect(output).toHaveTextContent("5");

    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(output).toHaveTextContent("15");

    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "0" }));
    expect(output).toHaveTextContent("10");

    fireEvent.click(screen.getByRole("button", { name: "=" }));
    expect(output).toHaveTextContent("25");
  });
});
