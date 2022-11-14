import { render, screen } from "@testing-library/react";
import { AddonContextProvider } from "../../../contexts/AddonContext";

import { Options } from "../Options";

test("displays image for each scoop option from server", async () => {
  render(
    <AddonContextProvider>
      <Options subTotal={0} optionType="scoops"></Options>
    </AddonContextProvider>
  );

  const scoopImages: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /scoop/i,
  });
  expect(scoopImages).toHaveLength(2);

  const altTexts = scoopImages.map((element: HTMLImageElement) => element.alt);
  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each topping option from server", async () => {
  render(
    <AddonContextProvider>
      <Options subTotal={0} optionType="toppings" />
    </AddonContextProvider>
  );

  const toppingImges: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /topping/i,
  });
  expect(toppingImges).toHaveLength(3);

  const altTexts = toppingImges.map((element) => element.alt);
  expect(altTexts).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
