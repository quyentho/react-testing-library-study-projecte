import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddonContextProvider } from "../../../contexts/AddonContext";
import { OrderEntry } from "../OrderEntry";

describe("Scoops total price correct calculation", () => {
  test("scoop inputs exist and start with 0 and topping checkboxes exist and uncheck by default", async () => {
    render(
      <AddonContextProvider>
        <OrderEntry></OrderEntry>
      </AddonContextProvider>
    );
    const inputs: HTMLInputElement[] = await screen.findAllByRole("spinbutton");
    expect(inputs).toHaveLength(2);
    inputs.map((input) => expect(+input.value).toBe(0));
    const scoopsSubTotal = screen.getByText(/Scoops total: \$/i, {
      exact: false,
    });
    expect(scoopsSubTotal).toHaveTextContent(/\$0/);

    const checkboxes: HTMLInputElement[] = await screen.findAllByRole(
      "checkbox"
    );

    expect(checkboxes).toHaveLength(3);
    checkboxes.map((checkbox) => expect(checkbox.checked).toBe(false));
  });

  test("add $2 to sub total foreach scoops", async () => {
    const user = userEvent.setup();
    render(
      <AddonContextProvider>
        <OrderEntry></OrderEntry>
      </AddonContextProvider>
    );
    const inputs: HTMLInputElement[] = await screen.findAllByRole("spinbutton");
    await user.type(inputs[0], "1");
    expect(inputs[0]).toHaveValue(1);

    const scoopsSubTotal = screen.getByText(/Scoops total: \$/i, {
      exact: false,
    });
    expect(scoopsSubTotal).toHaveTextContent(/\$2.00/);

    await user.clear(inputs[0]);
    await user.clear(inputs[1]);
    await user.type(inputs[0], "2");
    await user.type(inputs[1], "1");
    expect(scoopsSubTotal).toHaveTextContent(/\$6.00/);
  });

  test("each topping check will add $1.5 to topping sub total", async () => {
    const user = userEvent.setup();
    render(
      <AddonContextProvider>
        <OrderEntry></OrderEntry>
      </AddonContextProvider>
    );

    const checkboxes: HTMLInputElement[] = await screen.findAllByRole(
      "checkbox"
    );

    const toppingSubTotal = screen.getByText(/toppings total: \$/i, {
      exact: false,
    });
    expect(toppingSubTotal).toHaveTextContent(/\$0.00/);

    await user.click(checkboxes[0]);
    expect(toppingSubTotal).toHaveTextContent(/\$1.50/);
    await user.click(checkboxes[1]);
    expect(toppingSubTotal).toHaveTextContent(/\$3.00/);
    await user.click(checkboxes[2]);
    expect(toppingSubTotal).toHaveTextContent(/\$4.50/);

    // remove a check will decrease sub total
    await user.click(checkboxes[2]);
    expect(toppingSubTotal).toHaveTextContent(/\$3.00/);
  });
  test("Grand total will be calculated base on sub totals", async () => {
    const user = userEvent.setup();
    render(
      <AddonContextProvider>
        <OrderEntry></OrderEntry>
      </AddonContextProvider>
    );

    const grandTotal = screen.getByText(/grand total: \$/i, {
      exact: false,
    });

    expect(grandTotal).toHaveTextContent(/\$0.00/);

    const checkboxes: HTMLInputElement[] = await screen.findAllByRole(
      "checkbox"
    );
    const inputs: HTMLInputElement[] = await screen.findAllByRole("spinbutton");

    await user.click(checkboxes[0]);

    expect(grandTotal).toHaveTextContent(/\$1.50/);

    await user.clear(inputs[1]);
    await user.type(inputs[0], "2");

    expect(grandTotal).toHaveTextContent(/\$5.50/);
  });
});
