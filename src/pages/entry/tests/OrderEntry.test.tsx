import { screen, render } from "@testing-library/react";
import { rest } from "msw";
import { AddonContextProvider } from "../../../contexts/AddonContext";
import { server } from "../../../mocks/server";
import { OrderEntry } from "../OrderEntry";

test("alerts should show when there are errors from api", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(
    <AddonContextProvider>
      <OrderEntry></OrderEntry>
    </AddonContextProvider>
  );

  const alertElements = await screen.findAllByRole("alert");
  expect(alertElements).toHaveLength(2);
});
