import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("check checkbox will enable the button and uncheck will disable the button", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const buttonElement = screen.getByRole("button", {
    name: /confirm order/i,
  });
  const checkboxElelment = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(checkboxElelment);
  expect(checkboxElelment).toBeChecked();
  expect(buttonElement).toBeEnabled();

  await user.click(checkboxElelment);
  expect(checkboxElelment).not.toBeChecked();
  expect(buttonElement).toBeDisabled();
});

test("hover over span will show popup and hover out will hide popup", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const spanElement = screen.getByText(/terms and conditions/i);
  await user.hover(spanElement);
  const popupElement = screen.getByText(
    /no ice cream will actually be delivered/i
  );
  expect(popupElement).toBeInTheDocument();
  await user.unhover(spanElement);
  expect(popupElement).not.toBeInTheDocument();
});
