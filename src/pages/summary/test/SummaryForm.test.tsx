import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("check checkbox will enable the button and uncheck will disable the button", () => {
  render(<SummaryForm />);
  const buttonElement = screen.getByRole("button", {
    name: /confirm order/i,
  });
  const checkboxElelment = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  fireEvent.click(checkboxElelment);
  expect(checkboxElelment).toBeChecked();
  expect(buttonElement).toBeEnabled();

  fireEvent.click(checkboxElelment);
  expect(checkboxElelment).not.toBeChecked();
  expect(buttonElement).toBeDisabled();
});
