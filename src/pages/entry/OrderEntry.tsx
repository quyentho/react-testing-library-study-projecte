import { useMemo } from "react";
import { useAddonContext } from "../../contexts/AddonContext";
import { Options } from "./Options";

export const OrderEntry = () => {
  const {
    value: { scoops, toppings },
  } = useAddonContext();

  const scoopsSubTotal = useMemo(() => {
    let total = 0;
    for (const [, quantity] of Object.entries(scoops)) {
      total += +quantity;
    }
    return total * 2;
  }, [scoops]);

  const toppingsSubTotal = useMemo(() => {
    let total = 0;
    for (const [, isAdded] of Object.entries(toppings)) {
      if (isAdded) total += 1;
    }
    return total * 1.5;
  }, [toppings]);

  const grandTotal = scoopsSubTotal + toppingsSubTotal;

  return (
    <>
      <Options subTotal={scoopsSubTotal || 0} optionType="scoops"></Options>
      <Options subTotal={toppingsSubTotal || 0} optionType="toppings"></Options>
      <span>Grand total: ${grandTotal.toFixed(2)}</span>
    </>
  );
};
