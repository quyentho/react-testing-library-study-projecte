import { createContext, ReactNode, useContext, useState } from "react";

type Addon = {
  scoops: {
    [name: string]: number;
  };
  toppings: {
    [name: string]: boolean;
  };
};
export interface IAddonContext {
  value: Addon;
  setAddOnQuantity: (
    addon: "scoops" | "toppings",
    name: string,
    value: number | boolean
  ) => void;
}

const AddonContext = createContext<IAddonContext | undefined>(undefined);

export const useAddonContext = () => {
  const context = useContext(AddonContext);

  if (context === undefined) {
    throw new Error("useAddonContext must be used within AddonContextProvider");
  }

  return context;
};

export const AddonContextProvider = ({ children }: { children: ReactNode }) => {
  const [context, setContext] = useState<Addon>({
    scoops: {},
    toppings: {},
  });
  const setAddOnQuantity = (
    addon: "scoops" | "toppings",
    name: string,
    value: number | boolean
  ) => {
    setContext((current) => ({
      ...current,
      [addon]: {
        ...current[addon],
        [name]: value,
      },
    }));
  };
  return (
    <AddonContext.Provider value={{ value: context, setAddOnQuantity }}>
      {children}
    </AddonContext.Provider>
  );
};
